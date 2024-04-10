import {useIsFocused} from '@react-navigation/native';
import {SearchNormal1, Sort} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import eventAPI from '../../apis/eventApi';
import {
  CircleComponent,
  ContainerComponent,
  ListEventComponent,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {EventModel} from '../../models/EventModel';
import {globalStyles} from '../../styles/globalStyles';
import {debounce} from 'lodash';
import {LoadingModal} from '../../modals';

const SearchEvents = ({navigation, route}: any) => {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [results, setResults] = useState<EventModel[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getEvents();
  }, [isFocused]);

  useEffect(() => {
    console.log(searchKey);

    if (!searchKey) {
      setResults(events);
    } else {
      const hangeChangeSearchValue = debounce(handleSearchEvent, 500);

      hangeChangeSearchValue();
    }
  }, [searchKey]);

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

  const handleSearchEvent = async () => {
    const api = `/search-events?title=${searchKey}`;

    try {
      const res = await eventAPI.HandleEvent(api);

      if (res.data && res.data.length > 0) {
        setResults(res.data);
      } else {
        setResults([]);
      }

      setIsSearching(false);
    } catch (error) {
      console.log(error);
      setIsSearching(false);
    }
  };

  // const handleUpdateEvent = async () => {
  //   const categories = ['65f27187a08051b6ce99084d'];

  //   try {
  //     events.forEach(async item => {
  //       const api = `/update-event?id=${item._id}`;

  //       const res = await eventAPI.HandleEvent(
  //         api,
  //         {
  //           data: {categories},
  //         },
  //         'put',
  //       );

  //       console.log(res);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
              value={searchKey}
              onChangeText={val => setSearchKey(val)}
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

      {results.length > 0 ? (
        <ListEventComponent items={results} />
      ) : (
        <LoadingComponent isLoading={isLoading} values={results.length} />
      )}
    </ContainerComponent>
  );
};

export default SearchEvents;
