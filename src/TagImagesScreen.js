import React from 'react';
import {Container, TitleBox} from './HomeScreen';
import BasicHeaderBar from './components/bar/BasicHeaderBar';
import {ImageList} from './components/List/ImageList';
import {Text} from '@rneui/themed/dist';

const TagImagesScreen = props => {
  console.log(props);
  return (
    <>
      <BasicHeaderBar title={`# ${props.route.params}`} />
      <Container>
        <TitleBox></TitleBox>
        <ImageList />
      </Container>
    </>
  );
};

export default TagImagesScreen;
