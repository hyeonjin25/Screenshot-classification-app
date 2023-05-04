import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Text} from 'react-native-paper';
import {Tag} from './components/List/Tag';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {SearchBar} from './components/bar/SearchBar';
import {useSetRecoilState} from 'recoil';
import {QueryState} from './state/QueryState';

const HomeScreen = () => {
  const navigation = useNavigation();
  const setQueryState = useSetRecoilState(QueryState);

  useFocusEffect(() => {
    setQueryState('');
  }, []);

  return (
    <>
      <Container>
        <SearchBar />
        <TitleBox>
          <Text variant="headlineSmall" style={{fontWeight: 'bold'}}>
            즐겨 찾는 태그
          </Text>
          <Text
            variant="titleMedium"
            onPress={() => {
              navigation.navigate('Tag', 'favorite');
            }}
            style={{color: 'gray'}}>
            전체보기
          </Text>
        </TitleBox>
        <Tag title={'인스타그램'} />
        <Tag title={'인스타그램'} />
        <Tag title={'인스타그램'} />
        <Tag title={'인스타그램'} />
        <Tag title={'인스타그램'} />

        <TitleBox>
          <Text variant="headlineSmall" style={{fontWeight: 'bold'}}>
            전체 태그
          </Text>
          <Text
            variant="titleMedium"
            onPress={() => {
              navigation.navigate('Tag', 'whole');
            }}
            style={{color: 'gray'}}>
            전체보기
          </Text>
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

export const Container = styled.View`
  flex: 1;
  padding: 3% 5%;
`;

export const TitleBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export default HomeScreen;
