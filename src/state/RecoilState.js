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
