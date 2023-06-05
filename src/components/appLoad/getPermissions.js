import {Alert, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export const permissionVerVersion =
  Platform.Version >= 33
    ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

export const getStoragePermission = async () => {
  // 앨범 접근 권한 요청
  try {
    if (Platform.OS === 'android') {
      const result = await check(permissionVerVersion);
      return handlePermission(result);
    }
  } catch (err) {
    console.log(err);
  }
};

export const handlePermission = result => {
  switch (result) {
    case RESULTS.GRANTED:
      return true;
    case RESULTS.UNAVAILABLE:
      Confirm('알림', '해당 기기는 앨범에 접근할 수 있는 기기가 아닙니다.');
      return false;
    case RESULTS.DENIED:
      return requestPermission();
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
      return false;
  }
};

export const requestPermission = async () => {
  try {
    await request(permissionVerVersion);
    return true;
  } catch {
    Confirm(
      '알림',
      '앨범 접근 권한 허용 중 에러가 발생했습니다. 앱 설정 화면에서 권한을 허용해 주세요.',
    );
  }
  return false;
};
