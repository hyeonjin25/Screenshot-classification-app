import React from 'react';
import styled from 'styled-components';
import {FlatList, Image} from 'react-native';
import {windowWidth} from '../../utils/GlobalStyles';

export const ImageList = ({data}) => {
  console.log(data);
  return (
    <>
      <FlatList
        data={data}
        renderItem={List}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

const List = item => {
  console.log('아템', item);
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
