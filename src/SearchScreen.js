import {Text} from '@rneui/themed';
import React from 'react';
import {useRecoilState} from 'recoil';
import BackBar from './components/bar/BackBar';
import {SearchBar} from './components/bar/SearchBar';
import {ImageList} from './components/List/ImageList';
import {Container} from './HomeScreen';
import {QueryState} from './state/RecoilState';

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

const SearchScreen = () => {
  return (
    <>
      <BackBar />
      <Container>
        <SearchBar />
        <ImageList data={imageURI} />
      </Container>
    </>
  );
};

export default SearchScreen;
