import React, {useState, useCallback} from 'react';
import {TagList} from './components/List/TagList';
import BasicHeaderBar from './components/bar/BasicHeaderBar';
import {Text} from '@rneui/themed';
import {AppColor} from './utils/GlobalStyles';
import styled from 'styled-components';
import {useRecoilValue} from 'recoil';
import {AllTagState, FavoriteTagState} from './state/RecoilState';
import {useFocusEffect} from '@react-navigation/native';
import useFavorite from './hook/useFavorite';
import useAllTags from './hook/useAllTags';

const TagsScreen = props => {
  const [isDelete, setIsDelete] = useState(false);
  const favoriteTagState = useRecoilValue(FavoriteTagState);
  const allTagState = useRecoilValue(AllTagState);
  const favoriteTag = useFavorite();
  const allTag = useAllTags();

  useFocusEffect(
    useCallback(() => {
      favoriteTag();
      allTag();
    }, []),
  );

  return (
    <>
      {props.route.params.category == 'favorite' ? (
        <BasicHeaderBar
          title="즐겨 찾는 태그"
          rightIcon={
            <Text style={{fontSize: 18, color: AppColor.secondary}}>
              {favoriteTagState.length !== 0 && (isDelete ? '완료' : '편집')}
            </Text>
          }
          rightOnPress={() => {
            setIsDelete(!isDelete);
          }}
        />
      ) : (
        <BasicHeaderBar title={'전체 태그'} />
      )}
      <Container>
        <TagList
          tags={
            props.route.params.category == 'favorite'
              ? favoriteTagState
              : allTagState
          }
          isDelete={isDelete}
        />
      </Container>
    </>
  );
};

export const Container = styled.View`
  flex: 1;
  padding-top: 2%;
  padding-left: 3%;
  padding-right: 3%;
`;

export default TagsScreen;
