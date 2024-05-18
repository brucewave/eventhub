import {View, Text, Alert} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {NotificationModel} from '../models/NotificationModel';
import {
  AvatarComponent,
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';
import userAPI from '../apis/userApi';
import {ProfileModel} from '../models/ProfileModel';
import {DateTime} from '../utils/DateTime';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import eventAPI from '../apis/eventApi';

interface Props {
  item: NotificationModel;
}
const NotificationItem = (props: Props) => {
  const {item} = props;
  const [profile, setProfile] = useState<ProfileModel>();
  const [isLoading, setIsLoading] = useState(false);

  const ref = firestore().collection('notifcation').doc(item.id);

  const user = useSelector(authSelector);

  useEffect(() => {
    getUserDetail();
  }, [item.from]);
  const getUserDetail = async () => {
    const api = `/get-profile?uid=${item.from}`;
    setIsLoading(true);
    try {
      const res: any = await userAPI.HandleUser(api);

      setProfile(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleRemoveNotification = async () => {
    try {
      await ref.delete();
      console.log('Done');
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinEvent = async () => {
    const api = `/join-event?eventId=${item.eventId}&uid=${user.id}`;

    try {
      const res = await eventAPI.HandleEvent(api);

      await ref.update({
        idRead: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RowComponent
      styles={{
        paddingHorizontal: 16,
        marginBottom: 20,
        alignItems: 'flex-start',
      }}>
      <AvatarComponent
        size={45}
        name="faf"
        photoURL={profile && profile.photoUrl ? profile.photoUrl : ''}
      />
      <View style={{flex: 1, paddingHorizontal: 12, paddingRight: 28}}>
        <Text
          style={[
            globalStyles.text,
            {color: 'coral', fontFamily: 'AirbnbCereal_W_Md'},
          ]}>
          {profile && profile.name ? `${profile.name} ` : ''}
          <TextComponent
            text={item.content}
            color={item.idRead ? appColors.gray : appColors.text}
            styles={{
              fontFamily: item.idRead
                ? 'AirbnbCereal_W_Lt'
                : 'AirbnbCereal_W_Md',
            }}
          />
        </Text>
        <SpaceComponent height={16} />
        {!item.idRead && (
          <RowComponent
            styles={{justifyContent: 'center', alignItems: 'center'}}>
            <ButtonComponent
              text="Reject"
              type="primary"
              onPress={() =>
                Alert.alert(
                  'Confirm',
                  'Are you sure you want to reject this invite?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel remove'),
                    },
                    {
                      text: 'Reject',
                      style: 'destructive',
                      onPress: () => handleRemoveNotification(),
                    },
                  ],
                )
              }
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
              onPress={handleJoinEvent}
              text="Accept"
              type="primary"
              styles={{paddingVertical: 10}}
            />
          </RowComponent>
        )}
      </View>
      <TextComponent
        color={appColors.gray}
        text={DateTime.GetDateUpdate(item.createdAt)}
      />
    </RowComponent>
  );
};

export default NotificationItem;
