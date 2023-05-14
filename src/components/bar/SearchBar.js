import React from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
import {QueryState} from '../../state/RecoilState';
import {useRecoilState} from 'recoil';

export const SearchBar = () => {
  const navigation = useNavigation();
  const [queryState, setQueryState] = useRecoilState(QueryState);

  return (
    <Container>
      <Searchbar
        Icon="mdiMagnify"
        placeholder="원하는 태그를 입력하세요"
        onChangeText={setQueryState}
        value={queryState}
        onSubmitEditing={() => {
          navigation.navigate('Search');
        }}
      />
    </Container>
  );
};

const Container = styled.View``;
