import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import useSearch from '../../hook/useSearch';

export const TagList = ({tags}) => {
  const navigation = useNavigation();
  const searchTag = useSearch();
  console.log(tags);

  if (tags?.length !== 0) {
    return (
      <>
        {tags.map(tag => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TagImage', tag);
              searchTag(tag);
            }}>
            <TagBox>
              <Text style={{fontSize: 20}}># {tag}</Text>
            </TagBox>
          </TouchableOpacity>
        ))}
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
  padding: 5px;
`;
