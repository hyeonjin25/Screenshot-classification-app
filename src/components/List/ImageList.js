import React from 'react';
import styled from 'styled-components';
import {FlatList, Image} from 'react-native';
import {windowWidth} from '../../utils/GlobalStyles';
import {useNavigation} from '@react-navigation/native';

export const ImageList = ({data}) => {
  const navigation = useNavigation();
  return (
    <>
      <FlatList
        data={data}
        navigation={navigation}
        renderItem={item => <List uri={item.item} navigation={navigation} />}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

const List = ({uri, navigation}) => {
  return (
    uri && (
      <ImageBox
        onPress={() => {
          console.log('p')
          navigation.navigate('ImageDetail',{uri:uri});
        }}>
        <Image
          source={{uri: uri}}
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

const ImageBox = styled.TouchableOpacity`
  padding: 5px;
`;
