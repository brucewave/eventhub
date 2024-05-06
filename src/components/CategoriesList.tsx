import React, {ReactNode, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TagComponent, TextComponent} from '.';
import {KnifeFork, KnifeFork_Color} from '../assets/svgs';
import {appColors} from '../constants/appColors';
import {Category} from '../models/Category';
import eventAPI from '../apis/eventApi';
import {useIsFocused, useNavigation} from '@react-navigation/native';

interface Props {
  isFill?: boolean;
}

const CategoriesList = (props: Props) => {
  const {isFill} = props;

  const [categories, setCategories] = useState<Category[]>([]);
  const navigation: any = useNavigation();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const api = `/get-categories`;

    try {
      const res = await eventAPI.HandleEvent(api);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderIcon = (key: string) => {
    let icon = <></>;
    switch (key) {
      case 'music':
        icon = (
          <FontAwesome5
            name="music"
            color={isFill ? appColors.white : '#F59762'}
            size={20}
          />
        );
        break;
      case 'art':
        icon = (
          <Ionicons
            name="color-palette"
            size={20}
            color={isFill ? appColors.white : '#46CDFB'}
          />
        );
        break;
      case 'food':
        icon = isFill ? (
          <KnifeFork color={isFill ? appColors.white : '#29D697'} />
        ) : (
          <KnifeFork_Color color={isFill ? appColors.white : '#29D697'} />
        );
        break;
      default:
        icon = (
          <FontAwesome5
            name="basketball-ball"
            color={isFill ? appColors.white : '#F0635A'}
            size={20}
          />
        );
        break;
    }
    return icon;
  };

  return categories.length > 0 ? (
    <FlatList
      style={{paddingHorizontal: 16}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={item => item._id}
      renderItem={({item, index}) => (
        <TagComponent
          styles={{
            marginRight: index === categories.length - 1 ? 28 : 12,
            minWidth: 82,
          }}
          bgColor={isFill ? item.color : appColors.white}
          onPress={() =>
            navigation.navigate('CategoryDetail', {
              id: item._id,
              title: item.title,
            })
          }
          label={item.title}
          icon={renderIcon(item.key)}
          textColor={isFill ? appColors.white : appColors.text2}
        />
      )}
    />
  ) : (
    <></>
  );
};

export default CategoriesList;
