import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../HomeScreen';
import SearchScreen from '../SearchScreen';
import TagImagesScreen from '../TagImagesScreen';
import TagsScreen from '../TagsScreen';
import ImageDetailScreen from '../ImageDetailScreen';

const Stack = createStackNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{headerShown: false}}
      animationEnabled={false}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Tag" component={TagsScreen} />
      <Stack.Screen name="TagImage" component={TagImagesScreen} />
      <Stack.Screen name="ImageDetail" component={ImageDetailScreen} />
    </Stack.Navigator>
  );
}
