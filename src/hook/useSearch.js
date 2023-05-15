import {useRecoilState} from 'recoil';
import customAxios from '../api/axios';
import {ImageListState} from '../state/RecoilState';

const useSearch = () => {
  const [imageListState, setImageListState] = useRecoilState(ImageListState);

  // 태그 검색
  const searchTag = tag => {
    customAxios
      .get(`/search?tags=${tag}`)
      .then(res => {
        console.log('태그검색완료: ', res.data.data);
        setImageListState(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return searchTag;
};

export default useSearch;
