import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SearchBar as Searchbar} from '@rneui/themed';
import {QueryState} from '../../state/RecoilState';
import {useRecoilState} from 'recoil';
import {AppColor} from '../../utils/GlobalStyles';
import useSearch from '../../hook/useSearch';

export const SearchBar = () => {
  const navigation = useNavigation();
  const [queryState, setQueryState] = useRecoilState(QueryState);
  const searchTag = useSearch();

  return (
    <Searchbar
      placeholder="원하는 태그를 입력하세요"
      onChangeText={setQueryState}
      value={queryState}
      onSubmitEditing={() => {
        navigation.navigate('Search');
        searchTag(queryState);
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
