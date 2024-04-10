import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ContainerComponent,
  EventItem,
  ListEventComponent,
  LoadingComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {EventModel} from '../../models/EventModel';
import eventAPI from '../../apis/eventApi';

const CategoryDetail = ({navigation, route}: any) => {
  const {id, title}: {id: string; title: string} = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    id && getData();
  }, [id]);

  const getData = async () => {
    setIsLoading(true);

    await getEventsById();

    setIsLoading(false);
  };

  const getEventsById = async () => {
    const api = `/get-events-by-categoryid?id=${id}`;

    try {
      const res = await eventAPI.HandleEvent(api);

      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerComponent title={title} back isScroll={false}>
      {events.length > 0 ? (
        <ListEventComponent items={events} />
      ) : (
        <LoadingComponent isLoading={isLoading} values={events.length} />
      )}
    </ContainerComponent>
  );
};

export default CategoryDetail;
