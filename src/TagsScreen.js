import React, {useState} from 'react';
import {TagList} from './components/List/TagList';
import {Container, TagBox, TitleBox} from './HomeScreen';
import BackBar from './components/bar/BackBar';
import {Icon, ListItem, Text} from '@rneui/themed';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppColor} from './utils/GlobalStyles';
import {Button} from '@rneui/base';

const TagsScreen = props => {
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      {props.route.params.category == 'favorite' ? (
        <BackBar
          title="즐겨 찾는 태그"
          rightIcon={
            <Text style={{fontSize: 18, color: AppColor.secondary}}>
              {isDelete ? '완료' : '편집'}
            </Text>
          }
          rightOnPress={() => {
            setIsDelete(!isDelete);
          }}
        />
      ) : (
        <BackBar title={'전체 태그'} />
      )}
      <Container>
        <TagBox>
          <TagList tags={props.route.params.tags} isDelete={isDelete} />
        </TagBox>
      </Container>
    </>
  );
};

export default TagsScreen;
