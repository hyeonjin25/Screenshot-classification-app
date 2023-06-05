/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';

import {StackNavigator} from './src/navigator/StackNavigator';
import customAxios from './src/api/axios';
import LoadingBar from './src/components/bar/LoadingBar';
import ReloadBar from './src/components/bar/ReloadBar';
import {useFCMToken} from './src/hook/useFCMToken';
import {getStoragePermission} from './src/components/appLoad/getPermissions';
import {
  checkNewImages,
  getFormData,
  readImages,
  saveImages,
  sliceImageList,
} from './src/components/appLoad/getImages';

function App() {
  const fcmToken = useFCMToken();

  const dataLoadMessage = {
    1: '사진을 불러오는 중입니다...',
    2: '태그를 생성하는 중입니다...',
    3: '태그 생성이 완료되었습니다.',
    4: '이미지 태깅에 실패했습니다.',
  };

  const [dataLoadState, setDataLoadState] = useState(1);
  const [imageListNum, setImageListNum] = useState(0); // 전송할 이미지 리스트 개수
  const [sendImageListNum, setSendImageListNum] = useState(0); // 전송한 이미지 리스트 개수

  React.useEffect(() => {
    const getPermissionAndSendImages = async () => {
      const permission = await getStoragePermission();
      if (!permission) {
        setDataLoadState(4);
        return;
      }

      const allImages = await readImages(); // 기기의 모든 캡쳐사진 가져오기
      const newImages = await checkNewImages(allImages); // 새로운 캡쳐사진만 가져오기
      const sliceLists = await sliceImageList(allImages); // -> newImages 사진 배열 여러개로 나누기
      setImageListNum(sliceLists.length);
      sendImageLists(sliceLists);
    };
    getPermissionAndSendImages();
  }, []);

  // 캡쳐사진 서버에 전송
  const sendImageLists = async sliceLists => {
    // 50개씩 잘라서 전송
    sliceLists.forEach(async newImages => {
      sendImages(newImages);
    });
  };

  const sendImages = async newImages => {
    const formData = getFormData(newImages);

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
        if (imageListNum == sendImageListNum + 1) {
          setDataLoadState(3);
          saveImages(newImages); // 전송한 캡쳐사진 저장
        }
        setSendImageListNum(sendImageListNum + 1);
      })
      .catch(err => {
        console.log('MY LOGGG : /images SEND IMAGES FAIL : ', err, err.config);
        setDataLoadState(4);
      });
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
