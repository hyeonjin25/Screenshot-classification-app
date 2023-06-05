import AsyncStorage from '@react-native-async-storage/async-storage';

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

  // console.log('old', savedImageSet);
  // console.time('checkImages');
  // const newImages = new Array();
  // images.forEach(image => {
  //   console.log(savedImageSet.has(image.name));
  //   if (!savedImageSet.has(image.name)) {
  //     newImages.push(image);
  //   }
  // });
  // console.timeEnd('checkImages');

  // return newImages;

  return images;
};

export const sliceImageList = images => {
  const imageList = new Array();

  // 50개씩 자르기
  for (i = 0; i < images.length; i += 50) {
    imageList.push(images.slice(i, i + 50));
  }

  return imageList;
};

export const getFormData = newImages => {
  const formData = new FormData();

  // 50개씩 잘라서 전송
  newImages?.forEach(image => {
    formData.append('images', {
      uri: 'file://' + image.path,
      name: image.name,
      type: 'image/jpeg',
    });
  });

  return formData;
};

// 전송한 캡쳐사진 저장
export const saveImages = async newImages => {
  const savedImages = JSON.parse(await AsyncStorage.getItem('imageArr'));

  newImages.forEach(image => {
    savedImages.push(image.name);
  });

  console.log(savedImages);

  await AsyncStorage.setItem('imageArr', JSON.stringify(savedImages));
};
