/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {handleLinking} from './src/utils/handleLinking';

messaging().setBackgroundMessageHandler(async mess => {
  // handleLinking(`eventhub://app/detail/${mess.data.id}`);
});

messaging().onNotificationOpenedApp(mess => {
  // console.log(`forgress:  ${mess}`);
  handleLinking(`eventhub://app/detail/${mess.data.id}`);
});

AppRegistry.registerComponent(appName, () => App);
