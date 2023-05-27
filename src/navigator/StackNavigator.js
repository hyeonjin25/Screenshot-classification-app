import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../HomeScreen';
import SearchScreen from '../SearchScreen';
import TagImagesScreen from '../TagImagesScreen';
import TagsScreen from '../TagsScreen';
import ImageDetailScreen from '../ImageDetailScreen';
import {AppColor} from '../utils/GlobalStyles';
import WelcomeScreen from '../WelcomeScreen';

const Stack = createStackNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'Welcome'}
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: AppColor.white},
      }}
      animationEnabled={false}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Tag" component={TagsScreen} />
      <Stack.Screen name="TagImage" component={TagImagesScreen} />
      <Stack.Screen name="ImageDetail" component={ImageDetailScreen} />
    </Stack.Navigator>
  );
}
