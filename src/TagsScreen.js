import React from 'react';
import {Button, Text} from 'react-native-paper';
import {Tag} from './components/List/Tag';
import {Container, TitleBox} from './HomeScreen';
import BackBar from './components/bar/BackBar';

const TagsScreen = props => {
  return (
    <>
      <BackBar />
      <Container>
        <TitleBox>
          <Text variant="headlineSmall" style={{fontWeight: 'bold'}}>
            {props.route.params == 'favorite' ? '즐겨 찾는 태그' : '전체 태그'}
          </Text>
          <Button icon="dots-horizontal" textColor="black" />
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
