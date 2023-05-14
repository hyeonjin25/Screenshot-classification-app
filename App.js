/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {BASE_URL} from './src/config/api';
import {StackNavigator} from './src/navigator/StackNavigator';
import messaging from '@react-native-firebase/messaging';
import {RecoilRoot, useRecoilState} from 'recoil';
import {FcmTokenState} from './src/state/RecoilState';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const RNFS = require('react-native-fs');
  const [fcmTokenState, setFcmTokenState] = useRecoilState(FcmTokenState);

  
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
  };

  React.useEffect(() => {
    getFCMToken();
  }, []);

  RNFS.readDir(RNFS.ExternalStorageDirectoryPath + '/DCIM/Screenshots')
    .then(result => {
      // console.log('GOT RESULT', result);
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
      console.log(contents);
    })
    .catch(err => {
      console.log(err.message, err.code);
    });

  const sendImages = images => {
    const formData = new FormData();
    console.log('콘솔', images);
    formData.append('userDeviceToken', 'ddd');

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
      },
    };

    axios
      .post(`${BASE_URL}/images`, formData, config)
      .then(data => console.log(data))
      .catch(err => console.log('/images 에러 : ', err));
  };

  return (
    <RecoilRoot>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
