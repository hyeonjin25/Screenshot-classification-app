import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {windowHeight, windowWidth} from '../../utils/GlobalStyles';

export const readImages = async () => {
  const RNFS = require('react-native-fs');

  // 캡쳐사진 읽기
  try {
    const allImages = await RNFS.readDir(
      RNFS.ExternalStorageDirectoryPath + '/DCIM/Screenshots',
    );
    return allImages;
  } catch (err) {
    console.log(
      'MY LOGGG FAILED GET SCREENSHOT IMAGE : ',
      err.message,
      err.code,
    );
  }
};

// 캡쳐사진 저장 여부 확인
export const checkNewImages = async images => {
  const imageArr = await AsyncStorage.getItem('imageArr');
  const savedImageSet = new Set(JSON.parse(imageArr));

  const newImages = new Array();
  images.forEach(image => {
    if (!savedImageSet.has(image.name)) {
      newImages.push(image);
    }
  });

  return newImages;
};

export const sliceImageList = images => {
  const imageList = new Array();

  // 50개씩 자르기
  for (i = 0; i < images.length; i += 50) {
    imageList.push(images.slice(i, i + 50));
  }

  console.log(imageList);

  return imageList;
};

export const getFormDataWithImageResize = newImages => {
  const formData = new FormData();

  // 50개씩 잘라서 전송

  newImages?.forEach(async image => {
    const ResizedImage = await ImageResizer.createResizedImage(
      image.path, // path
      windowWidth, // width
      windowHeight, // height
      'WEBP', // CompressFormat
      100, // quality(for JPEG)
      0, // rotation
      null, // outputPath (null일 경우 cache에 저장)
    );

    console.log(ResizedImage);
    formData.append('images', {
      uri: 'file://' + ResizedImage.path,
      name: 'file://' + ResizedImage.path, //image.name 대신 다음에 프론트에서 사진에 접근할 수 있도록 uri로 대신 보냄
      type: 'image/WEBP',
    });
  });

  return formData;
};

// 전송한 캡쳐사진 저장
export const saveImages = async allImages => {
  console.log('all : ', allImages);

  let newImageArr = [];

  allImages.forEach(image => {
    newImageArr.push(image.name);
  });

  await AsyncStorage.setItem('imageArr', JSON.stringify(newImageArr));
};
