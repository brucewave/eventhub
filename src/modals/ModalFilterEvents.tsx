import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useSelector} from 'react-redux';
import eventAPI from '../apis/eventApi';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {Category} from '../models/Category';
import {authSelector} from '../redux/reducers/authReducer';
import {globalStyles} from '../styles/globalStyles';
import {fontFamilies} from '../constants/fontFamilies';
import {ArrowRight, ArrowRight2, Calendar} from 'iconsax-react-native';
import DatePicker from 'react-native-date-picker';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelected?: (vals: string[]) => void;
  seletected?: string[];
}

const ModalFilterEvents = (props: Props) => {
  const {visible, onClose, onSelected, seletected} = props;

  const [categories, setCategories] = useState<Category[]>([]);
  const [categorySelected, setCategorySelected] = useState<string[]>([]);
  const [isVisibleModalDate, setIsVisibleModalDate] = useState(false);

  const modalizeRef = useRef<Modalize>();
  const auth = useSelector(authSelector);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [visible]);

  const getCategories = async () => {
    const api = `/get-categories`;

    try {
      const res = await eventAPI.HandleEvent(api);
      setCategories(res.data);
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const handleSelectCategory = (id: string) => {
    const items = [...categorySelected];

    const index = items.findIndex(element => element === id);

    if (items.includes(id)) {
      items.splice(index, 1);
    } else {
      items.push(id);
    }

    setCategorySelected(items);
  };

  return (
    <>
      <Portal>
        <Modalize
          handlePosition="inside"
          adjustToContentHeight
          ref={modalizeRef}
          onClose={onClose}>
          <SectionComponent styles={{padding: 30}}>
            <TextComponent size={18} text="Filter" />
          </SectionComponent>
          {categories.length > 0 && (
            <FlatList
              style={{marginBottom: 16}}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={({item, index}) => (
                <View
                  style={[
                    globalStyles.center,
                    {
                      marginLeft: index === 0 ? 16 : 0,
                      marginRight: index < categories.length - 1 ? 16 : 0,
                    },
                  ]}
                  key={item._id}>
                  <>
                    <TouchableOpacity
                      style={[
                        globalStyles.center,
                        {
                          width: 63,
                          height: 63,
                          backgroundColor: categorySelected.includes(item._id)
                            ? item.color
                            : appColors.white,
                          borderWidth: 1,
                          borderColor: item.color,
                          borderRadius: 100,
                        },
                      ]}
                      onPress={() => handleSelectCategory(item._id)}>
                      <Image
                        source={{
                          uri: categorySelected.includes(item._id)
                            ? item.iconWhite
                            : item.iconColor,
                        }}
                        style={{width: 29, height: 29}}
                      />
                    </TouchableOpacity>
                    <SpaceComponent height={8} />
                    <TextComponent numOfLine={1} text={item.title} />
                  </>
                </View>
              )}
            />
          )}

          <SectionComponent>
            <TextComponent
              text="Date time"
              font={fontFamilies.medium}
              size={16}
            />

            <RowComponent styles={{marginVertical: 12}} justify="flex-start">
              <TouchableOpacity
                style={[globalStyles.button, localStyles.button]}>
                <TextComponent text="Today" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.button, localStyles.button]}>
                <TextComponent text="Tomorrow" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.button, localStyles.button]}>
                <TextComponent text="This week" />
              </TouchableOpacity>
            </RowComponent>
            <RowComponent
              onPress={() => setIsVisibleModalDate(true)}
              styles={[
                globalStyles.button,
                localStyles.button,
                {
                  paddingVertical: 14,
                  width: '70%',
                },
              ]}>
              <Calendar size={20} color={appColors.primary} variant="Bold" />
              <TextComponent
                text="Choice from calender"
                flex={1}
                styles={{paddingHorizontal: 8}}
              />
              <ArrowRight2 color={appColors.primary} size={20} />
            </RowComponent>
          </SectionComponent>
          <SectionComponent>
            <RowComponent>
              <ButtonComponent
                type="primary"
                color="white"
                onPress={() => {}}
                textColor={appColors.text}
                text="Reset"
              />
              <ButtonComponent type="primary" onPress={() => {}} text="Agree" />
            </RowComponent>
          </SectionComponent>
        </Modalize>
      </Portal>

      <DatePicker
        mode={'date'}
        open={isVisibleModalDate}
        date={new Date()}
        modal
        onCancel={() => setIsVisibleModalDate(false)}
        onConfirm={val => console.log(val)}
      />
    </>
  );
};

export default ModalFilterEvents;

const localStyles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: appColors.gray2,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
  },
});
