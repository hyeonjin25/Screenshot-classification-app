import { useSetRecoilState} from 'recoil';
import customAxios from '../api/axios';
import {AllTagState} from '../state/RecoilState';

const useAllTags = () => {
  const setAllTagState = useSetRecoilState(AllTagState);

  // 즐겨찾는 태그 조회
  const AllTag = () =>
    customAxios
      .get(`/tags`)
      .then(res => {
        setAllTagState(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });

  return AllTag;
};

export default useAllTags;
