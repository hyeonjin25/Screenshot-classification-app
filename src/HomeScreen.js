import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {TagList} from './components/List/TagList';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SearchBar} from './components/bar/SearchBar';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {
  AllTagState,
  FavoriteTagState,
  NoFavoriteTagsState,
  QueryState,
} from './state/RecoilState';
import {AppColor, windowHeight, windowWidth} from './utils/GlobalStyles';
import {Divider, Icon, Overlay, Text} from '@rneui/themed';
import customAxios from './api/axios';
import {Button} from '@rneui/base';
import {FlatList} from 'react-native-gesture-handler';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectAddTag, setSelectAddTag] = useState('');
  const setQueryState = useSetRecoilState(QueryState);
  const [favoriteTagState, setFavoriteTagState] =
    useRecoilState(FavoriteTagState);
  const [allTagState, setAllTagState] = useRecoilState(AllTagState);
  const noFavoriteTagState = useRecoilValue(NoFavoriteTagsState);

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
      })
      .catch(err => {
        console.log(err);
      });

    // 모든 태그 조회
    customAxios
      .get(`/tags`)
      .then(res => {
        setAllTagState(res.data.data);
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
            <Row>
              <Text h4>즐겨 찾는 태그</Text>
              {/* 태그 추가 아이콘 */}
              <IconBox
                onPress={() => {
                  setVisible(true);
                  setSelectAddTag('');
                }}>
                <Icon type="entypo" name="plus" />
              </IconBox>
            </Row>

            <Text
              variant="titleMedium"
              onPress={() => {
                navigation.navigate('Tag', {
                  category: 'favorite',
                  tags: favoriteTagState,
                });
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
                navigation.navigate('Tag', {
                  category: 'all',
                  tags: allTagState,
                });
              }}
              style={{color: AppColor.gray}}>
              전체보기
            </Text>
          </TitleBox>
          <TagList tags={allTagState} />
        </TagBox>
      </Container>

      {/* 즐겨찾는 태그 추가 모달 */}
      <Overlay
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={{
          backgroundColor: AppColor.white,
          width: windowWidth * 0.7,
          maxHeight: windowHeight * 0.4,
          padding: 20,
          justifyContent: 'space-around',
          borderRadius: 10,
        }}>
        <FlatList
          data={noFavoriteTagState}
          renderItem={item => (
            <ChoiceTags
              data={item}
              setSelectAddTag={setSelectAddTag}
              selectAddTag={selectAddTag}
            />
          )}
        />

        <Button
          title="태그 추가"
          buttonStyle={{
            backgroundColor: AppColor.secondary,
            borderRadius: 20,
            marginTop: '5%',
          }}
          onPress={() => {
            setVisible(false);

            // 사진에 태그 추가
            customAxios
              .post(`/book-mark-tags/${selectAddTag}`)
              .then(res => {
                // 태그 목록 다시 조회
                getTags();
              })
              .catch(err => {
                console.log(err);
              });
          }}
        />
      </Overlay>
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

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconBox = styled.TouchableOpacity`
  padding: 10px;
`;

const ChoiceTags = ({data, setSelectAddTag, selectAddTag}) => {
  console.log(data);
  return (
    <TextList
      key={data.index}
      onPress={() => setSelectAddTag(data.item)}
      select={selectAddTag == data.item}>
      <Text># {data.item}</Text>
    </TextList>
  );
};

const TextList = styled.TouchableOpacity`
  background: ${props => (props.select ? AppColor.primary : AppColor.white)};
  padding: 10px;
`;

export default HomeScreen;
