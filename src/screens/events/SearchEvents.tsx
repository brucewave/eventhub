import {useIsFocused} from '@react-navigation/native';
import {SearchNormal1, Sort} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import eventAPI from '../../apis/eventApi';
import {
  CircleComponent,
  ContainerComponent,
  ListEventComponent,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  TagComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {EventModel} from '../../models/EventModel';
import {globalStyles} from '../../styles/globalStyles';

const SearchEvents = ({navigation, route}: any) => {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getEvents();
  }, [isFocused]);

  const getEvents = async () => {
    const api = `/get-events`;

    if (events.length === 0) {
      setIsLoading(true);
    }

    try {
      const res = await eventAPI.HandleEvent(api);

      if (res.data) {
        setEvents(res.data);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <ContainerComponent back title="Search">
      <SectionComponent>
        <RowComponent>
          <RowComponent
            styles={{flex: 1}}
            onPress={() =>
              navigation.navigate('SearchEvents', {
                isFilter: false,
              })
            }>
            <SearchNormal1
              variant="TwoTone"
              color={appColors.primary}
              size={20}
            />
            <View
              style={{
                width: 1,
                backgroundColor: appColors.primary,
                marginHorizontal: 10,
                height: 20,
              }}
            />
            <TextInput
              placeholder="Search"
              value=""
              onChangeText={val => console.log(val)}
              style={[globalStyles.text, {flex: 1}]}
            />
          </RowComponent>
          <TagComponent
            bgColor={appColors.primary}
            onPress={() => {}}
            label="Filters"
            icon={
              <CircleComponent size={20} color={appColors.white}>
                <Sort size={16} color={appColors.primary} />
              </CircleComponent>
            }
          />
        </RowComponent>
      </SectionComponent>
      {events.length > 0 ? (
        <ListEventComponent items={events} />
      ) : (
        <LoadingComponent isLoading={isLoading} values={events.length} />
      )}
    </ContainerComponent>
  );
};

export default SearchEvents;
