import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {TagList} from './components/List/TagList';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SearchBar} from './components/bar/SearchBar';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {AllTagState, FavoriteTagState, QueryState} from './state/RecoilState';
import {AppColor} from './utils/GlobalStyles';
import {Divider, Text} from '@rneui/themed';
import customAxios from './api/axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const setQueryState = useSetRecoilState(QueryState);
  const [favoriteTagState, setFavoriteTagState] =
    useRecoilState(FavoriteTagState);
  const [allTagState, setAllTagState] = useRecoilState(AllTagState);

  useFocusEffect(
    useCallback(() => {
      setQueryState('');
    }, []),
  );

  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
    // 즐겨찾는 태그 조회
    customAxios
      .get(`/book-mark-tags`)
      .then(res => {
        setFavoriteTagState(res.data.data);
        console.log('즐겨찾는 태그 : ', res);
      })
      .catch(err => {
        console.log(err);
      });

    // 모든 태그 조회
    customAxios
      .get(`/tags`)
      .then(res => {
        setAllTagState(res.data.data);
        console.log('모든 태그 : ', res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        <SearchBox>
          <SearchBar />
        </SearchBox>
        <TagBox>
          <TitleBox>
            <Text h4>즐겨 찾는 태그</Text>
            <Text
              variant="titleMedium"
              onPress={() => {
                navigation.navigate('Tag', {category:'favorite',tags: favoriteTagState});
              }}
              style={{color: AppColor.gray}}>
              전체보기
            </Text>
          </TitleBox>
          <TagList tags={favoriteTagState} />

          <Divider style={{marginTop: '5%', marginBottom: '5%'}} />

          <TitleBox>
            <Text h4>전체 태그</Text>
            <Text
              variant="titleMedium"
              onPress={() => {
                navigation.navigate('Tag', {category:'all',tags: allTagState});
              }}
              style={{color: AppColor.gray}}>
              전체보기
            </Text>
          </TitleBox>
          <TagList tags={allTagState} />
        </TagBox>
      </Container>
    </>
  );
};

export const Container = styled.View`
  flex: 1;
  padding-top: 3%;
  padding-left: 5%;
  padding-right: 5%;
`;

export const SearchBox = styled.View`
  margin-bottom: 5%;
`;

export const TitleBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const TagBox = styled.ScrollView`
  margin-left: 3%;
  margin-right: 3%;
  margin-bottom: 10px;
`;

export default HomeScreen;
