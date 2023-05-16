import React from 'react';
import {Container, TitleBox} from './HomeScreen';
import BackBar from './components/bar/BackBar';
import {ImageList} from './components/List/ImageList';
import {Text} from '@rneui/themed/dist';

const imageURI = [
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
  'http://placeimg.com/640/480/animals',
];

const TagImagesScreen = props => {
  console.log(props)
  return (
    <>
      <BackBar />
      <Container>
        <TitleBox>
          <Text h4># {props.route.params}</Text>
        </TitleBox>
        <ImageList data={imageURI} />
      </Container>
    </>
  );
};

export default TagImagesScreen;
