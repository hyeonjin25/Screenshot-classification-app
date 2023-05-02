import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Button, Text} from 'react-native-paper';
import {Tag} from './components/List/Tag';
import {Container, TitleBox} from './HomeScreen';

const TagsScreen = props => {
  const navigation = useNavigation();
  return (
    <>
      <Appbar.BackAction
        onPress={() => {
          navigation.pop();
        }}
      />
      <Container>
        <TitleBox>
          <Text variant="headlineSmall" style={{fontWeight: 'bold'}}>
            {props.route.params == 'favorite' ? '즐겨 찾는 태그' : '전체 태그'}
          </Text>
          <Button
            icon="dots-horizontal"
            textColor="black"
          />
        </TitleBox>
        <Tag title={'인스타그램'} />
        <Tag title={'인스타그램'} />
        <Tag title={'인스타그램'} />
        <Tag title={'인스타그램'} />
        <Tag title={'인스타그램'} />
      </Container>
    </>
  );
};

export default TagsScreen;
