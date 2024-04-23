import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {TextComponent} from '../../components';

const EventsScreen = ({navigation}: any) => {
  return (
    <View>
      <Text>EventsScreen</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('EventDetail', {id: '65e1870653232561b467ec8e'})
        }>
        <TextComponent text="fafafa" />
      </TouchableOpacity>
    </View>
  );
};

export default EventsScreen;
