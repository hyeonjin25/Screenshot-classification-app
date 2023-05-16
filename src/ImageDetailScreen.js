import React, {useState, useEffect} from 'react';
import {Vibration} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon, Text} from '@rneui/themed';
import {Input} from '@rneui/themed';
import {Button, Overlay} from '@rneui/base';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {AppColor, windowWidth} from './utils/GlobalStyles';
import BackBar from './components/bar/BackBar';
import customAxios from './api/axios';
import {useRecoilState} from 'recoil';
import { TagListState } from './state/RecoilState';

const ImageDetailScreen = props => {
  const navigation = useNavigation();
  console.log('dd', props.route.params);
  const [visible, setVisible] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [tagListState, setTagListState] = useRecoilState(TagListState); // 태그 리스트
  console.log(newTag);

  const tags = [
    '강아지',
    '고양이',
    '나비',
    '강아지이이',
    '고양이',
    '나비',
    '강아지',
    '고양이',
    '나비',
    '강아지',
    '고양이',
    '나비',
    '강아지',
    '고양이',
    '나비',
  ];

  useEffect(() => {
    customAxios
      .get(`/images/${props.route.params.imageId}`)
      .then(res => {
        setTagListState(res?.data?.data?.tags);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <BackBar />

      <ImageBox>
        <Image source={{uri: props.route.params.imageUrl}} />
      </ImageBox>

      <TagBox>
        <Tags tags={tagListState} />
        <AddButton onPress={() => setVisible(true)}>
          <Icon type="entypo" name="plus" />
          <Text style={{marginLeft: 5}}>태그 추가</Text>
        </AddButton>
      </TagBox>

      {/* 태그 추가 모달 */}
      <Overlay
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={{
          backgroundColor: AppColor.white,
          width: windowWidth * 0.7,
          padding: 20,
          justifyContent: 'space-around',
          borderRadius: 10,
        }}>
        <Input
          placeholder="태그 입력"
          value={newTag}
          onChangeText={setNewTag}
        />
        <Button
          title="추가"
          buttonStyle={{
            backgroundColor: AppColor.secondary,
            borderRadius: 20,
          }}
          onPress={() => {
            setVisible(false);

            // 사진에 태그 추가
            customAxios
              .post(`/image/${props.route.params.imageId}/tag/${newTag}`)
              .then(res => {
                console.log(res);
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

const ImageBox = styled.View`
  flex: 1;
`;

const Image = styled.Image`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  aspect-ratio: ${props => props.aspectRatio || 1};
  resize-mode: contain;
`;

const TagBox = styled.View`
  height: 20%;
  padding: 5%;
  padding-bottom: 2%;
`;

const AddButton = styled.TouchableOpacity`
  margin-top: auto;
  margin-left: auto;
  flex-direction: row;
  align-items: center;
`;

const Tags = ({tags}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TagsGroup>
        {tags.map((tag, index) => (
          <TouchableWithoutFeedback
            delayLongPress={300}
            onLongPress={() => {
              Vibration.vibrate(100);
            }}>
            <Tag key={index}>
              <Text style={{fontSize: 15}}># {tag}</Text>
            </Tag>
          </TouchableWithoutFeedback>
        ))}
      </TagsGroup>
    </ScrollView>
  );
};

const TagsGroup = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const Tag = styled.View`
  background-color: ${AppColor.primary};
  border-radius: 17px;
  padding: 8px;
  margin: 5px;
`;

export default ImageDetailScreen;
