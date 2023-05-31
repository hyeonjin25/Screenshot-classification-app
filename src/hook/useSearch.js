import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import customAxios from '../api/axios';
import {ImageListState, LoadingState} from '../state/RecoilState';

const useSearch = () => {
  const [imageListState, setImageListState] = useRecoilState(ImageListState);
  const [loadingState, setLoadingState] = useRecoilState(LoadingState);

  useEffect(() => {
    setLoadingState(true);
  }, []);

  // 태그 검색
  const searchTag = tag => {
    customAxios
      .get(`/search?tags=${tag}`)
      .then(res => {
        console.log('MY LOGGG : TAG SEARCH SUCCESS', res.data.data);
        setImageListState(res.data.data);
        setLoadingState(false);
      })
      .catch(err => {
        console.log('에로', err);
      });
  };

  return searchTag;
};

export default useSearch;
