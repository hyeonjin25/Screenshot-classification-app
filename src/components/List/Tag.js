import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export const Tag = ({title}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('TagImage', title)}>
      <TagBox>
        <Text variant="titleLarge" style={{color: '#606060'}}>
          # {title}
        </Text>
      </TagBox>
    </TouchableOpacity>
  );
};

const TagBox = styled.View`
  flex-direction: row;
  padding: 5px;
`;
