import React from 'react';
import styled from 'styled-components';
import {FlatList, Image} from 'react-native';
import {windowWidth} from '../../utils/GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import {ImageListState} from '../../state/RecoilState';
import {useRecoilState} from 'recoil';
import {Text} from '@rneui/themed';

export const ImageList = () => {
  const navigation = useNavigation();
  const [imageListState, setImageListState] = useRecoilState(ImageListState);

  if (imageListState.length !== 0) {
    return (
      <FlatList
        data={imageListState}
        navigation={navigation}
        renderItem={item => <List data={item.item} navigation={navigation} />}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    );
  } else {
    return (
      <TextBox>
        <Text>이미지가 존재하지 않습니다.</Text>
      </TextBox>
    );
  }
};

const TextBox = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 5%;
  flex: 1;
`;

const List = ({data, navigation}) => {
  console.log(data);

  return (
    <ImageBox
      onPress={() => {
        navigation.navigate('ImageDetail', {
          imageId: data.imageId,
          imageUrl: data.imageUrl,
        });
      }}
      key={data.imageId}>
      <Image
        source={{uri: data.imageUrl}}
        style={{
          width: windowWidth * 0.3 - 10,
          height: windowWidth * 0.3 - 10,
        }}
        resizeMode="cover"
      />
    </ImageBox>
  );
};

const ImageBox = styled.TouchableOpacity`
  padding: 5px;
`;
