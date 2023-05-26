import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SearchBar as Searchbar} from '@rneui/themed';
import {QueryState} from '../../state/RecoilState';
import {useRecoilState} from 'recoil';
import {AppColor} from '../../utils/GlobalStyles';
import useSearch from '../../hook/useSearch';

export const SearchBar = ({
  containerColor = AppColor.primary,
  inputColor = AppColor.white,
}) => {
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
        backgroundColor: inputColor,
        elevation: 3,
        padding: 2,
        borderRadius: 15,
      }}
      containerStyle={{backgroundColor: containerColor, marginTop: 10}}
      cancelButtonTitle={'취소'}
      cancelButtonProps={{color: AppColor.secondary, paddingRight: 8}}
    />
  );
};
