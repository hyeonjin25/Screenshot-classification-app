import React from 'react';
import {Container, TitleBox} from './HomeScreen';
import BackBar from './components/bar/BackBar';
import {ImageList} from './components/List/ImageList';
import {Text} from '@rneui/themed/dist';

const TagImagesScreen = props => {
  console.log(props);
  return (
    <>
      <BackBar title={`# ${props.route.params}`} />
      <Container>
        <TitleBox>
        </TitleBox>
        <ImageList />
      </Container>
    </>
  );
};

export default TagImagesScreen;
