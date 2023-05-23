import React from 'react';
import BasicHeaderBar from './components/bar/BasicHeaderBar';
import {ImageList} from './components/List/ImageList';

const TagImagesScreen = props => {
  console.log(props);
  return (
    <>
      <BasicHeaderBar title={`# ${props.route.params}`} />
      <ImageList />
    </>
  );
};

export default TagImagesScreen;
