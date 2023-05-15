import React from 'react';
import {TagList} from './components/List/TagList';
import {Container, TagBox, TitleBox} from './HomeScreen';
import BackBar from './components/bar/BackBar';
import {Button, Icon, Text} from '@rneui/themed';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TagsScreen = props => {
  console.log(props.route.params);
  return (
    <>
      <BackBar />
      <Container>
        <TagBox>
          <TitleBox>
            <Text h4>
              {props.route.params.category == 'favorite'
                ? '즐겨 찾는 태그'
                : '전체 태그'}
            </Text>
            <TouchableOpacity style={{marginLeft: 10}} onPress={() => {}}>
              <Icon type="entypo" name="dots-three-vertical" color="white" />
            </TouchableOpacity>
          </TitleBox>
          <TagList tags={props.route.params.tags} />
        </TagBox>
      </Container>
    </>
  );
};

export default TagsScreen;
