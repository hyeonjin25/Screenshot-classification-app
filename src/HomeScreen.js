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
  TopAllTagsState,
  TopFavoriteTagsState,
} from './state/RecoilState';
import {AppColor, windowHeight, windowWidth} from './utils/GlobalStyles';
import {Icon, Overlay, Text} from '@rneui/themed';
import customAxios from './api/axios';
import {Button} from '@rneui/base';
import {FlatList} from 'react-native-gesture-handler';
import useFavorite from './hook/useFavorite';

const HomeScreen = () => {
  const navigation = useNavigation();
  const favoriteTag = useFavorite();

  const [visible, setVisible] = useState(false);
  const [selectAddTag, setSelectAddTag] = useState('');
  const setQueryState = useSetRecoilState(QueryState);

  const topFavoriteTagState = useRecoilValue(TopFavoriteTagsState);
  const topAllTagState = useRecoilValue(TopAllTagsState);
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
    favoriteTag();

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

  const addTags = () => {
    setVisible(false);

    // 사진에 태그 추가
    if (selectAddTag !== '') {
      customAxios
        .post(`/book-mark-tags/${selectAddTag}`)
        .then(res => {
          // 태그 목록 다시 조회
          getTags();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <GrayBox>
      <SearchBar />

      <TagBox showsVerticalScrollIndicator={false}>
        <WhiteBox>
          <TitleBox>
            <Row>
              <Text h2>즐겨 찾는 태그</Text>
              {/* 태그 추가 아이콘 */}
              <IconBox
                onPress={() => {
                  setVisible(true);
                  setSelectAddTag('');
                }}>
                <Icon type="entypo" name="plus" color={AppColor.secondary} />
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
              style={{color: AppColor.secondary}}>
              전체보기
            </Text>
          </TitleBox>
          <TagList tags={topFavoriteTagState} />
        </WhiteBox>

        <DivideBox height={30} />

        <WhiteBox>
          <TitleBox>
            <Text h2>전체 태그</Text>
            <Text
              variant="titleMedium"
              onPress={() => {
                navigation.navigate('Tag', {
                  category: 'all',
                  tags: allTagState,
                });
              }}
              style={{color: AppColor.secondary}}>
              전체보기
            </Text>
          </TitleBox>
          <TagList tags={topAllTagState} />
        </WhiteBox>
      </TagBox>

      {/* 즐겨찾는 태그 추가 모달 */}
      <Overlay
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={{
          backgroundColor: AppColor.white,
          width: windowWidth * 0.7,
          maxHeight: windowHeight * 0.4,
          padding: 30,
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
          showsVerticalScrollIndicator={false}
        />

        <ButtonBox>
          <Button
            title="태그 추가"
            buttonStyle={{
              backgroundColor: AppColor.secondary,
              borderRadius: 20,
              marginTop: '5%',
            }}
            onPress={() => addTags()}
          />
        </ButtonBox>
      </Overlay>
    </GrayBox>
  );
};

const GrayBox = styled.View`
  flex: 1;
  background-color: ${AppColor.body};
`;

const WhiteBox = styled.View`
  background-color: ${AppColor.white};
  padding: 3% 0;
  margin: 0 20px;
  border-radius: 15px;
  elevation: 2;
`;

export const Container = styled.View`
  flex: 1;
  padding-top: 2%;
  padding-left: 4%;
  padding-right: 4%;
`;

export const SearchBox = styled.View`
  margin-bottom: 5%;
`;

const DivideBox = styled.View`
  width: ${windowWidth}
  height: ${props => props.height};
`;

export const TitleBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 5%;
`;

export const TagBox = styled.ScrollView`
  margin-bottom: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconBox = styled.TouchableOpacity`
  padding: 5px;
`;

const ButtonBox = styled.View`
  margin-top: 10px;
`;

const ChoiceTags = ({data, setSelectAddTag, selectAddTag}) => {
  return (
    <TextList
      key={data.index}
      onPress={() => {
        selectAddTag == data.item
          ? setSelectAddTag('')
          : setSelectAddTag(data.item);
      }}
      select={selectAddTag == data.item}>
      <Text h4># {data.item}</Text>
    </TextList>
  );
};

const TextList = styled.TouchableOpacity`
  background: ${props => (props.select ? AppColor.primary : AppColor.white)};
  padding: 11px;
`;

export default HomeScreen;
