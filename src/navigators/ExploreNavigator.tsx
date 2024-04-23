import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  CategoryDetail,
  EventDetail,
  ExploreEvents,
  HomeScreen,
  SearchEvents,
} from '../screens';
import {useStatusBar} from '../hooks/useStatusBar';

const ExploreNavigator = () => {
  const Stack = createNativeStackNavigator();
  useStatusBar('ligth-content');
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetail} />

      {/* <Stack.Screen name="EventDetail" component={EventDetail} /> */}
    </Stack.Navigator>
  );
};

export default ExploreNavigator;
