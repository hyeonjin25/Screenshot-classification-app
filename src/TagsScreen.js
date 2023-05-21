import React, {useState} from 'react';
import {TagList} from './components/List/TagList';
import {TagBox} from './HomeScreen';
import BasicHeaderBar from './components/bar/BasicHeaderBar';
import {Text} from '@rneui/themed';
import {AppColor} from './utils/GlobalStyles';
import styled from 'styled-components';
import {useRecoilValue} from 'recoil';
import {FavoriteTagState} from './state/RecoilState';

const TagsScreen = props => {
  const [isDelete, setIsDelete] = useState(false);
  const favoriteTagState = useRecoilValue(FavoriteTagState);

  return (
    <>
      {props.route.params.category == 'favorite' ? (
        <BasicHeaderBar
          title="즐겨 찾는 태그"
          rightIcon={
            <Text style={{fontSize: 18, color: AppColor.secondary}}>
              {props.route.params.tags.length !== 0 &&
                (isDelete ? '완료' : '편집')}
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
        <TagBox>
          <TagList
            tags={
              props.route.params.category == 'favorite'
                ? favoriteTagState
                : props.route.params.tags
            }
            isDelete={isDelete}
          />
        </TagBox>
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
