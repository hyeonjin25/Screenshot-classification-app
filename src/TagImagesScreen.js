import React from 'react';
import {useRecoilState} from 'recoil';
import BasicHeaderBar from './components/bar/BasicHeaderBar';
import LoadingBar from './components/bar/LoadingBar';
import {ImageList} from './components/List/ImageList';
import {LoadingState} from './state/RecoilState';

const TagImagesScreen = props => {
  const [loadingState, setLoadingState] = useRecoilState(LoadingState);

  return (
    <>
      <BasicHeaderBar title={`# ${props.route.params}`} />
      {loadingState ? <LoadingBar /> : <ImageList />}
    </>
  );
};

export default TagImagesScreen;
