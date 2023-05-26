import {atom, selector} from 'recoil';
import ReactNativeRecoilPersist from 'react-native-recoil-persist';

// 검색어
export const QueryState = atom({
  key: 'query',
  default: '',
});

// 즐겨찾는 태그
export const FavoriteTagState = atom({
  key: 'favoriteTag',
  default: [],
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

// 전체 태그
export const AllTagState = atom({
  key: 'allTag',
  default: [],
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

// 랜더링 이미지
export const ImageListState = atom({
  key: 'imageList',
  default: [],
});

// 랜더링 태그
export const TagListState = atom({
  key: 'tagList',
  default: [],
});

// 로딩 상태
export const LoadingState = atom({
  key: 'loading',
  default: false,
});

// 즐겨찾기 되지 않은 태그들
export const NoFavoriteTagsState = selector({
  key: 'noFavoriteTags',
  get: ({get}) => {
    const allTag = get(AllTagState);
    const favoriteTag = get(FavoriteTagState);
    return allTag.filter(tag => !favoriteTag.includes(tag));
  },
});

// 홈화면에 표시 될 즐겨찾기 태그들
export const TopFavoriteTagsState = selector({
  key: 'topFavoriteTags',
  get: ({get}) => {
    const favoriteTag = get(FavoriteTagState);
    return favoriteTag.slice(0, 5);
  },
});

// 홈화면에 표시 될 전체 태그들
export const TopAllTagsState = selector({
  key: 'topAllTags',
  get: ({get}) => {
    const allTag = get(AllTagState);
    return allTag.slice(0, 5);
  },
});
