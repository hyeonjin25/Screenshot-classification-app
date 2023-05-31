/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {StackNavigator} from './src/navigator/StackNavigator';
import customAxios from './src/api/axios';
import LoadingBar from './src/components/bar/LoadingBar';
import ReloadBar from './src/components/bar/ReloadBar';

function App() {
  const RNFS = require('react-native-fs');

  const [dataLoadState, setDataLoadState] = useState(1);

  React.useEffect(() => {
    getFCMToken();
    getStoragePermission();
  }, []);

  // fcm token 가져와서 storage에 저장
  const getFCMToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('old fcmToken: ', fcmToken);
    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('new fcmToken: ', fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      } catch (err) {
        console.log(err, 'fcmtoken에서 error 발생');
      }
    }
    return fcmToken;
  };

  const getStoragePermission = () => {
    // 앨범 접근 권한 요청
    if (Platform.OS === 'android') {
      check(
        Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      )
        .then(result => {
          console.log(result);
          switch (result) {
            case RESULTS.UNAVAILABLE:
              Confirm(
                '알림',
                '해당 기기는 앨범에 접근할 수 있는 기기가 아닙니다.',
              );
              console.log('앨범 접근 권한 : unavailable');
              break;
            case RESULTS.GRANTED:
              console.log('앨범 접근 권한 : granted');
              readImages();
              break;
            case RESULTS.DENIED:
              request(
                Platform.Version >= 33
                  ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
                  : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
              )
                .then(res => {
                  console.log('앨범 접근 권한 허용 : ', res);
                  readImages();
                })
                .catch(() => {
                  Confirm(
                    '알림',
                    '앨범 접근 권한 허용 중 에러가 발생했습니다. 앱 설정 화면에서 권한을 허용해 주세요.',
                  );
                });
              break;
            case RESULTS.BLOCKED:
              console.log('앨범 접근 권한 : blocked');
              Alert.alert(
                '',
                '이미지태거에서 기기의 사진에 액세스할 수 있도록 앱 설정 화면에서 권한을 허용해주세요.',
                [
                  {
                    text: '거부',
                    onPress: () => {
                      console.log('앨범 접근 권한 허용 거부됨');
                    },
                  },
                  {
                    text: '허용',
                    onPress: () => Linking.openSettings(),
                  },
                ],
              );
              break;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const readImages = () => {
    // 캡쳐사진 읽기
    RNFS.readDir(RNFS.ExternalStorageDirectoryPath + '/DCIM/Screenshots')
      .then(result => {
        sendImages(result);
        return result.map(res => [RNFS.stat(res), res]);
      })
      .then(statResult => {
        // console.log('statResult', statResult);
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[0]);
        }

        return 'no file';
      })
      .then(contents => {
        // log the file contents
        console.log('file contents :', contents);
      })
      .catch(err => {
        console.log(
          'MY LOGGG FAILED GET SCREENSHOT IMAGE : ',
          err.message,
          err.code,
        );
      });
  };

  // 캡쳐사진 서버에 전송
  const sendImages = async images => {
    const formData = new FormData();
    console.log('MY LOGGG GET IMAGES FOR SEND : ', images);

    try {
      images?.map(image => {
        formData.append('images', {
          uri: 'file://' + image.path,
          name: image.name,
          type: 'image/jpeg',
        });
      });
    } catch (err) {
      console.log('MY LOGGG FORM DATA ERROR : ', err);
    }
    const fcmToken = await getFCMToken();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        userDeviceToken: fcmToken,
      },
    };

    setDataLoadState(2);
    customAxios
      .post('/images', formData, config)
      .then(data => {
        console.log('MY LOGGG : /images SEND IMAGES SUCCESS : ', data);
        setDataLoadState(3);
      })
      .catch(err => {
        console.log('MY LOGGG : /images SEND IMAGES FAIL : ', err, err.config);
        setDataLoadState(4);
      });
  };

  console.log('loadingState : ', dataLoadState);

  if (dataLoadState == 1 || dataLoadState == 2)
    return (
      <LoadingBar
        title={
          dataLoadState == 1
            ? '사진을 불러오는 중입니다...'
            : '태그를 생성하는 중입니다...'
        }
      />
    );
  else if (dataLoadState == 4) {
    return (
      <ReloadBar
        title={'이미지 태깅에 실패했습니다'}
        onPress={() => {
          readImages();
          setDataLoadState(1);
        }}
      />
    );
  }

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
