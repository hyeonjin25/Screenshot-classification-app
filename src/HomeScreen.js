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
import useFavorite from './hook/useFavorite';
import useAllTags from './hook/useAllTags';

const HomeScreen = () => {
  const navigation = useNavigation();
  const favoriteTag = useFavorite();
  const allTag = useAllTags();

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
    favoriteTag();

    // 모든 태그 조회
    allTag();
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
      <Container>
        <SearchBar />
      </Container>

      <TagBox showsVerticalScrollIndicator={false}>
        <DivideBox height={15} />
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
          <TagList tags={favoriteTagState.slice(0, 5)} />
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
          <TagList tags={allTagState.slice(0, 5)} />
        </WhiteBox>

        <DivideBox height={20} />
      </TagBox>

      {/* 즐겨찾는 태그 추가 모달 */}
      <Overlay
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={{
          backgroundColor: AppColor.white,
          width: Math.round(windowWidth * 0.7),
          maxHeight: Math.round(windowHeight * 0.4),
          padding: 30,
          justifyContent: 'space-around',
          borderRadius: 15,
          elevation: 3,
        }}>
        {noFavoriteTagState.length === 0 ? (
          <NoTag>
            <Text style={{color: '#D3D3D3'}}>태그가 존재하지 않습니다.</Text>
          </NoTag>
        ) : (
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
        )}

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
  margin: 0 5%;
  border-radius: 15px;
  elevation: 2;
`;

export const Container = styled.View`
  padding: 0 3.3%;
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

const NoTag = styled.View`
  align-items: center;
  justify-content: center;
`;

const ButtonBox = styled.View`
  margin-top: 10px;
`;

const ChoiceTags = ({data, setSelectAddTag, selectAddTag}) => {
  return (
    <>
      {data.index !== 0 && <Divider />}
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
    </>
  );
};

const TextList = styled.TouchableOpacity`
  background: ${props => (props.select ? AppColor.primary : AppColor.white)};
  padding: 11px;
`;

export default HomeScreen;
