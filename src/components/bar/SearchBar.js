import React from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {SearchBar as Searchbar, ThemeProvider} from '@rneui/themed';
import {QueryState} from '../../state/RecoilState';
import {useRecoilState} from 'recoil';
import {AppColor, theme} from '../../utils/GlobalStyles';
import customAxios from '../../api/axios';

export const SearchBar = () => {
  const navigation = useNavigation();
  const [queryState, setQueryState] = useRecoilState(QueryState);

  return (
      <Searchbar
        placeholder="원하는 태그를 입력하세요"
        onChangeText={setQueryState}
        value={queryState}
        onSubmitEditing={() => {
          navigation.navigate('Search');

          // 태그 검색
          customAxios
            .get(`/search?tags=${queryState}`)
            .then(res => {
              console.log(res.data.data);
            })
            .catch(err => {
              console.log(err);
            });
        }}
        platform="ios"
        inputContainerStyle={{
          backgroundColor: AppColor.primary,
        }}
        cancelButtonTitle={'취소'}
        cancelButtonProps={{color: AppColor.secondary}}
      />
  );
};
