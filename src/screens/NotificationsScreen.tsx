import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {
  AvatarComponent,
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import {authSelector} from '../redux/reducers/authReducer';
import {globalStyles} from '../styles/globalStyles';
import firestore from '@react-native-firebase/firestore';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    firestore()
      .collection('notifcation')
      .where('idRead', '==', false)
      .where('uid', '==', user.id)
      .onSnapshot(snap => {
        if (snap.empty) {
          setNotifications([]);
        } else {
          const items: any = [];

          snap.forEach(item =>
            items.push({
              id: item.id,
              ...item.data(),
            }),
          );

          setNotifications(items);
        }
      });
  }, []);

  const user = useSelector(authSelector);
  const notification = {
    from: '65b61a57ac0bd3479732238b',
    to: '',
    createdAt: Date.now(),
    content: 'Invite A virtual Evening of Smooth Jazz',
    eventId: '',
    idRead: false,
  };

  useEffect(() => {
    const items: any = [];
    Array.from({length: 100}).forEach(item =>
      items.push({...notification, id: Math.floor(Math.random() * 100000)}),
    );

    setNotifications(items);
  }, []);

  return (
    <ContainerComponent
      isScroll={false}
      back
      title="Notifications"
      right={
        <ButtonComponent
          icon={
            <Feather name="more-vertical" size={20} color={appColors.text} />
          }
        />
      }>
      {notifications.length > 0 ? (
        <>
          <FlatList
            style={{paddingTop: 20}}
            data={notifications}
            renderItem={({item, index}) => (
              <RowComponent
                key={`notification${index}`}
                styles={{
                  paddingHorizontal: 16,
                  marginBottom: 20,
                  alignItems: 'flex-start',
                }}>
                <AvatarComponent
                  size={45}
                  name="faf"
                  photoURL="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png"
                />
                <View
                  style={{flex: 1, paddingHorizontal: 12, paddingRight: 28}}>
                  <Text
                    style={[
                      globalStyles.text,
                      {color: 'coral', fontFamily: 'AirbnbCereal_W_Md'},
                    ]}>
                    {'fafafa '}
                    <Text style={[globalStyles.text]}>{item.content}</Text>
                  </Text>
                  <SpaceComponent height={16} />
                  <RowComponent
                    styles={{justifyContent: 'center', alignItems: 'center'}}>
                    <ButtonComponent
                      text="Reject"
                      type="primary"
                      styles={[
                        globalStyles.center,
                        {
                          borderWidth: 1,
                          borderColor: appColors.gray2,
                          paddingVertical: 10,
                          backgroundColor: appColors.white,
                        },
                      ]}
                      textColor={appColors.gray}
                      textStyles={{fontWeight: '400'}}
                    />
                    <ButtonComponent
                      text="Accept"
                      type="primary"
                      styles={{paddingVertical: 10}}
                    />
                  </RowComponent>
                </View>
                <TextComponent color={appColors.gray} text="fafafa" />
              </RowComponent>
            )}
          />
        </>
      ) : (
        <SectionComponent styles={[globalStyles.center, {flex: 1}]}>
          <Image
            source={require('../assets/images/emptyNotificationImage.png')}
            style={{
              width: '50%',
            }}
          />
          <TextComponent
            text="No Notifications!"
            color="#344B67"
            size={18}
            font={fontFamilies.medium}
          />
          <SpaceComponent height={16} />
          <TextComponent
            size={16}
            color="#344B67"
            styles={{textAlign: 'center'}}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor"
          />
        </SectionComponent>
      )}
    </ContainerComponent>
  );
};

export default NotificationsScreen;
