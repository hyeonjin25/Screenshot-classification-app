import React from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {Divider, ListItem, Text} from '@rneui/themed';
import useSearch from '../../hook/useSearch';
import {Icon} from '@rneui/base';
import customAxios from '../../api/axios';
import {FlatList} from 'react-native-gesture-handler';
import {AppColor} from '../../utils/GlobalStyles';
import useFavorite from '../../hook/useFavorite';

export const TagList = ({tags, isDelete}) => {
  const searchTag = useSearch();

  if (tags?.length !== 0) {
    return (
      <Container>
        <FlatList
          data={tags}
          renderItem={item => {
            return (
              <List
                data={item.item}
                isDelete={isDelete}
                index={item.index}
                searchTag={searchTag}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    );
  }

  return (
    <TagBox>
      <Text style={{color: AppColor.gray}}>태그가 존재하지 않습니다.</Text>
    </TagBox>
  );
};

const Container = styled.View`
  margin: 0 3%;
`;

const TagBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2%;
`;

const List = ({data, isDelete, index, searchTag}) => {
  const navigation = useNavigation();
  const favoriteTag = useFavorite();

  const onDelete = data => {
    customAxios
      .delete(`/book-mark-tags/${data}`)
      .then(res => {
        favoriteTag();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {index != 0 && <Divider />}
      <ListItem
        key={index}
        onPress={() => {
          navigation.navigate('TagImage', data);
          searchTag(data);
        }}>
        <ListItem.Content>
          <ListItem.Title>
            <Text style={{fontSize: 20}}># {data}</Text>
          </ListItem.Title>
        </ListItem.Content>
        {isDelete ? (
          <Icon
            name="close"
            type="MaterialCommunityIcons"
            color={AppColor.secondary}
            onPress={() => onDelete(data)}
          />
        ) : (
          <ListItem.Chevron />
        )}
      </ListItem>
    </>
  );
};
