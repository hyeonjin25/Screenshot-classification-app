import React from 'react';
import {Tag} from './components/List/Tag';
import {Container} from './HomeScreen';
import BackBar from './components/bar/BackBar';
import {ImageList} from './components/List/ImageList';

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
  return (
    <>
      <BackBar />
      <Container>
        <Tag title={props.route.params} />
        <ImageList data={imageURI} />
      </Container>
    </>
  );
};

export default TagImagesScreen;
