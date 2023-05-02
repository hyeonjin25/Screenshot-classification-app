import React from 'react';
import styled from 'styled-components';
import {Tag} from './components/List/Tag';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Container} from './HomeScreen';
import {FlatList, Image} from 'react-native';
import {windowWidth} from './utils/GlobalStyles';

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
  const navigation = useNavigation();
  return (
    <>
      <Appbar.BackAction
        onPress={() => {
          navigation.pop();
        }}
      />
      <Container>
        <Tag title={props.route.params} />

        <FlatList data={imageURI} renderItem={ImageList} numColumns={3} />
      </Container>
    </>
  );
};

export const ImageList = item => {
  console.log(item);
  return (
    item && (
      <ImageBox>
        <Image
          source={{uri: item.item}}
          style={{
            width: windowWidth * 0.3 - 10,
            height: windowWidth * 0.3 - 10,
          }}
          resizeMode="cover"
        />
      </ImageBox>
    )
  );
};

const ImageBox = styled.View`
  padding: 5px;
`;

export default TagImagesScreen;
