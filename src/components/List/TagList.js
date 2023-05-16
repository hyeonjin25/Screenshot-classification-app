import React from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {Divider, Icon, ListItem, Text} from '@rneui/themed';
import useSearch from '../../hook/useSearch';
import {Button} from '@rneui/base';
import customAxios from '../../api/axios';
import {FlatList} from 'react-native-gesture-handler';

export const TagList = ({tags, isDelete}) => {
  const searchTag = useSearch();
  console.log(tags);

  if (tags?.length !== 0) {
    return (
      <>
        <FlatList
          data={tags}
          renderItem={item => {
            console.log(item);
            return (
              <List
                data={item.item}
                isDelete={isDelete}
                index={item.index}
                searchTag={searchTag}
              />
            );
          }}
        />
      </>
    );
  } else {
    return (
      <TagBox>
        <Text style={{color: 'lightGray'}}>태그가 존재하지 않습니다.</Text>
      </TagBox>
    );
  }
};

const TagBox = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 2%;
`;

const List = ({data, isDelete, index, searchTag}) => {
  const navigation = useNavigation();

  const onDelete = data => {
    customAxios
      .delete(`/book-mark-tags/${data}`)
      .then(res => {
        console.log(res);
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
          <Button
            title="삭제"
            onPress={() => onDelete(data)}
            icon={{name: 'delete', color: 'white'}}
            buttonStyle={{backgroundColor: 'red'}}
          />
        ) : (
          <ListItem.Chevron />
        )}
      </ListItem>
    </>
  );
};
