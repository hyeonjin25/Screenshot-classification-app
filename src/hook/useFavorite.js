import { useSetRecoilState} from 'recoil';
import customAxios from '../api/axios';
import {FavoriteTagState} from '../state/RecoilState';

const useFavorite = () => {
  const setFavoriteTagState = useSetRecoilState(FavoriteTagState);

  // 즐겨찾는 태그 조회
  const FavoriteTag = () =>
    customAxios
      .get(`/book-mark-tags`)
      .then(res => {
        setFavoriteTagState(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });

  return FavoriteTag;
};

export default useFavorite;
