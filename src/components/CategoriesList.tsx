import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ButtonComponent, TagComponent} from '.';
import eventAPI from '../apis/eventApi';
import {KnifeFork, KnifeFork_Color} from '../assets/svgs';
import {appColors} from '../constants/appColors';
import {Category} from '../models/Category';

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
          bgColor={isFill ? item.color : 'white'}
          onPress={() =>
            navigation.navigate('CategoryDetail', {
              id: item._id,
              title: item.title,
            })
          }
          label={item.title}
          icon={
            <Image
              source={{uri: isFill ? item.iconWhite : item.iconColor}}
              style={{width: 20, height: 20}}
            />
          }
          textColor={isFill ? 'white' : appColors.text2}
        />
      )}
    />
  ) : (
    <></>
  );
};

export default CategoriesList;
