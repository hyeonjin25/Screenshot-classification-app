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

import {StackNavigator} from './src/navigator/StackNavigator';
import customAxios from './src/api/axios';
import LoadingBar from './src/components/bar/LoadingBar';
import ReloadBar from './src/components/bar/ReloadBar';
import {useFCMToken} from './src/hook/useFCMToken';

function App() {
  const RNFS = require('react-native-fs');
  const fcmToken = useFCMToken();

  const [dataLoadState, setDataLoadState] = useState(1);

  React.useEffect(() => {
    getStoragePermission();
  }, []);

  const permissionVerVersion =
    Platform.Version >= 33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

  const getStoragePermission = async () => {
    // 앨범 접근 권한 요청
    try {
      if (Platform.OS === 'android') {
        const result = await check(permissionVerVersion);
        handlePermission(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePermission = result => {
    switch (result) {
      case RESULTS.GRANTED:
        readImages();
        break;
      case RESULTS.UNAVAILABLE:
        Confirm('알림', '해당 기기는 앨범에 접근할 수 있는 기기가 아닙니다.');
        break;
      case RESULTS.DENIED:
        requestPermission();
        break;
      case RESULTS.BLOCKED:
        Alert.alert(
          '',
          '이미지태거에서 기기의 사진에 액세스할 수 있도록 앱 설정 화면에서 권한을 허용해주세요.',
          [
            {
              text: '거부',
              onPress: () => console.log('앨범 접근 권한 허용 거부됨'),
            },
            {
              text: '허용',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        break;
    }
  };

  const requestPermission = async () => {
    try {
      await request(permissionVerVersion);
      readImages();
    } catch {
      Confirm(
        '알림',
        '앨범 접근 권한 허용 중 에러가 발생했습니다. 앱 설정 화면에서 권한을 허용해 주세요.',
      );
    }
  };

  const readImages = async() => {
    // 캡쳐사진 읽기
    try {
      const result = await RNFS.readDir(
        RNFS.ExternalStorageDirectoryPath + '/DCIM/Screenshots',
      );
      sendImages(result);
    } catch (err) {
      console.log(
        'MY LOGGG FAILED GET SCREENSHOT IMAGE : ',
        err.message,
        err.code,
      );
    }
  };

  // 캡쳐사진 서버에 전송
  const sendImages = async images => {
    const formData = new FormData();
    console.log('MY LOGGG GET IMAGES FOR SEND : ', images);

    images?.map(image => {
      formData.append('images', {
        uri: 'file://' + image.path,
        name: image.name,
        type: 'image/jpeg',
      });
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        userDeviceToken: fcmToken,
      },
    };

    setDataLoadState(2);
    console.log('MY LOGGG : /images SEND IMAGES START');

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

  const dataLoadMessage = {
    1: '사진을 불러오는 중입니다...',
    2: '태그를 생성하는 중입니다...',
    3: '태그 생성이 완료되었습니다.',
    4: '이미지 태깅에 실패했습니다.',
  };

  if (dataLoadState == 1 || dataLoadState == 2)
    return <LoadingBar title={dataLoadMessage[dataLoadState]} />;
  else if (dataLoadState == 4) {
    return (
      <ReloadBar
        title={dataLoadMessage[dataLoadState]}
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
