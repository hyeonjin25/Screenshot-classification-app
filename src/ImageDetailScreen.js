import React, {useState, useEffect} from 'react';
import {Header, Icon, Text} from '@rneui/themed';
import {Input} from '@rneui/themed';
import {Button, Chip, Overlay} from '@rneui/base';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {AppColor, windowWidth} from './utils/GlobalStyles';
import {BackBar} from './components/bar/BasicHeaderBar';
import customAxios from './api/axios';
import {useRecoilState} from 'recoil';
import {TagListState} from './state/RecoilState';

const ImageDetailScreen = props => {
  const [showHeader, setShowHeader] = useState(false); //사진 터치하면 헤더 보이도록
  const [visible, setVisible] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [tagListState, setTagListState] = useRecoilState(TagListState); // 태그 리스트
  console.log('url : ', props.route.params.imageUrl);

  useEffect(() => {
    getTags();
  }, []);

  const getTags = () => {
    customAxios
      .get(`/images/${props.route.params.imageId}`)
      .then(res => {
        console.log('태그들', res?.data?.data);
        setTagListState(res?.data?.data?.tags);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addTag = () => {
    setVisible(false);

    // 사진에 태그 추가
    customAxios
      .post(`/image/${props.route.params.imageId}/tag/${newTag}`)
      .then(res => {
        // 태그 동기화
        getTags();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteTag = tag => {
    setVisible(false);

    // 태그 삭제
    customAxios
      .delete(`/image/tag/${tag}`)
      .then(res => {
        // 태그 동기화
        getTags();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {showHeader && (
        <HeaderBar>
          <Header
            leftComponent={<BackBar color={'white'} />}
            backgroundColor="rgba(50,50,50,0.5)"
          />
        </HeaderBar>
      )}

      <ImageBox
        onPress={() => {
          setShowHeader(!showHeader);
        }}>
        {/* <Image
          source={{
            uri: 'file:///storage/emulated/0/DCIM/Screenshots/Screenshot_20230605-193349_Instagram.jpg',
          }}
        /> */}
        <Image source={{uri: props.route.params.imageUrl}} />
      </ImageBox>

      {showHeader && (
        <TagBox>
          <Tags tags={tagListState} deleteTag={deleteTag} isDelete={isDelete} />
          <ButtonBox>
            <AddButton onPress={() => setIsDelete(!isDelete)}>
              <Icon
                type="entypo"
                name="minus"
                color={isDelete ? 'black' : 'white'}
              />
              <Text
                style={{
                  color: isDelete ? 'black' : 'white',
                  fontWeight: 'bold',
                }}>
                태그 삭제
              </Text>
            </AddButton>
            <AddButton
              onPress={() => {
                setVisible(true);
                setNewTag('');
              }}>
              <Icon type="entypo" name="plus" color="white" />
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                태그 추가
              </Text>
            </AddButton>
          </ButtonBox>
        </TagBox>
      )}

      {/* 태그 추가 모달 */}
      <Overlay
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={{
          backgroundColor: AppColor.white,
          width: Math.round(windowWidth * 0.7),
          padding: 20,
          justifyContent: 'space-around',
          borderRadius: 10,
          elevation: 3,
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
          onPress={() => addTag()}
        />
      </Overlay>
    </>
  );
};

const HeaderBar = styled.View`
  position: absolute;
  width: 100%;
  z-index: 1;
`;

const ImageBox = styled.TouchableWithoutFeedback`
  flex: 1;
`;

const Image = styled.Image`
  margin: auto;
  width: 100%;
  height: 100%;
  /* aspect-ratio: ${props => props.aspectRatio || 0.8}; */
  resize-mode: contain;
`;

const TagBox = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 1;
  padding: 5%;
  padding-bottom: 2%;
  background: rgba(50, 50, 50, 0.5);
`;

const ButtonBox = styled.View`
  flex-direction: row;
  margin-top: 5%;
  margin-left: auto;
`;

const AddButton = styled.TouchableOpacity`
  margin-top: auto;
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
`;

const Tags = ({tags, deleteTag, isDelete}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TagsGroup>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            index={index}
            title={`# ${tag.second}`}
            icon={
              isDelete && {
                name: 'x',
                type: 'feather',
                size: 15,
                color: 'white',
              }
            }
            onPress={() => deleteTag(tag.first)}
            iconRight
            containerStyle={{margin: 5}}
            buttonStyle={{backgroundColor: AppColor.secondary, elevation: 1}}
            titleStyle={{fontWeight: 'bold'}}
          />
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

export default ImageDetailScreen;
