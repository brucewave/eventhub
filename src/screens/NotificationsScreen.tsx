import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {
  AvatarComponent,
  ButtonComponent,
  ContainerComponent,
  NotificationItem,
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
import {NotificationModel} from '../models/NotificationModel';
import {LoadingModal} from '../modals';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const user = useSelector(authSelector);

  useEffect(() => {
    setIsLoading(true);
    firestore()
      .collection('notifcation')
      .where('uid', '==', user.id)
      .onSnapshot(snap => {
        if (snap.empty) {
          setNotifications([]);
          setIsLoading(false);
        } else {
          const items: any = [];

          snap.forEach(item =>
            items.push({
              id: item.id,
              ...item.data(),
            }),
          );

          setNotifications(items);
          setIsLoading(false);
        }
      });
  }, []);

  const handleChecktoReadAllNotification = () => {
    setIsUpdating(true);
    try {
      notifications.forEach(async item => {
        await firestore().collection('notifcation').doc(item.id).update({
          idRead: true,
        });
      });

      setIsUpdating(false);
    } catch (error) {
      console.log(error);
      setIsUpdating(false);
    }
  };

  return (
    <ContainerComponent
      isScroll={false}
      back
      title="Notifications"
      right={
        notifications.filter(element => !element.idRead).length > 0 && (
          <ButtonComponent
            onPress={handleChecktoReadAllNotification}
            icon={
              <Feather name="check-square" size={20} color={appColors.text} />
            }
          />
        )
      }>
      {isLoading ? (
        <SectionComponent styles={[globalStyles.center, {flex: 1}]}>
          <ActivityIndicator color={appColors.gray2} />
          <TextComponent text="Loading..." color={appColors.gray} />
        </SectionComponent>
      ) : notifications.length > 0 ? (
        <>
          <FlatList
            style={{paddingTop: 20}}
            data={notifications}
            renderItem={({item, index}) => (
              <NotificationItem item={item} key={item.id} />
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
      <LoadingModal visible={isUpdating} />
    </ContainerComponent>
  );
};

export default NotificationsScreen;
