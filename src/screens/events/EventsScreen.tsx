import React, {useEffect, useState} from 'react';
import {
  CardComponent,
  ContainerComponent,
  EventItem,
  ListEventComponent,
  LoadingComponent,
  TextComponent,
} from '../../components';
import eventAPI from '../../apis/eventApi';
import {FlatList, Text, View} from 'react-native';
import {EventModel} from '../../models/EventModel';
import {ActivityIndicator} from 'react-native';

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

      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerComponent title="Events" back>
      {events.length > 0 ? (
        <ListEventComponent items={events} />
      ) : (
        <LoadingComponent
          isLoading={isLoading}
          mess="Loading..."
          values={events.length}
        />
      )}
    </ContainerComponent>
  );
};

export default EventsScreen;
