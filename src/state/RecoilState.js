// import { ReactNativeRecoilPersist } from 'react-native-recoil-persist/build/Persist';
import {atom} from 'recoil';

// 검색어
export const QueryState = atom({
  key: 'queryState',
  default: '',
});

// FCM 토큰
export const FcmTokenState = atom({
  key: 'FcmTokenState',
  default: null,
  // effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

// 즐겨찾는 태그
export const FavoriteTagState = atom({
  key: 'FavoriteTagState',
  default: [],
});

// 전체 태그
export const AllTagState = atom({
  key: 'AllTagState',
  default: [],
});

// 랜더링 이미지
export const ImageListState = atom({
  key: 'ImageListState',
  default: [],
});
