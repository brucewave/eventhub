import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  CardComponent,
  ContainerComponent,
  EventItem,
  ListEventComponent,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import eventAPI from '../../apis/eventApi';
import {FlatList, Image, Text, View} from 'react-native';
import {EventModel} from '../../models/EventModel';
import {ActivityIndicator} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {SearchNormal1} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EventsScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<EventModel[]>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    await getEvents();
    setIsLoading(false);
  };

  const getEvents = async () => {
    const api = `/get-events`;
    try {
      const res: any = await eventAPI.HandleEvent(api);

      // setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerComponent
      title="Events"
      back
      right={
        <ButtonComponent
          icon={
            <MaterialIcons name="more-vert" size={22} color={appColors.text} />
          }
        />
      }>
      <FlatList
        contentContainerStyle={{flex: 1}}
        ListEmptyComponent={
          <View style={[globalStyles.center, {flex: 1}]}>
            <Image
              source={require('../../assets/images/empty-events.png')}
              style={{width: 202, height: 202}}
            />
            <TextComponent
              text="No Upcoming Event"
              title
              size={24}
              styles={{marginVertical: 12}}
            />

            <View style={{width: '70%'}}>
              <TextComponent
                text="Lorem ipsum dolor sit amet, consectetur"
                size={16}
                color="#747688"
                styles={{textAlign: 'center'}}
              />
            </View>
          </View>
        }
        data={events}
        renderItem={({item}) => (
          <EventItem
            item={item}
            key={item._id}
            type="list"
            styles={{flex: 1, width: undefined}}
          />
        )}
      />
      {events.length === 0 && (
        <SectionComponent styles={{}}>
          <ButtonComponent
            onPress={() => navigation.navigate('ExploreEvents')}
            text="Explore events"
            type="primary"
          />
        </SectionComponent>
      )}
    </ContainerComponent>
  );
};

export default EventsScreen;
