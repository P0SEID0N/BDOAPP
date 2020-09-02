import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native'

export default class NotificationService {
    //onNotificaitn is a function passed in that is to be called when a
    //notification is to be emitted.
  constructor(onNotification) {
    this.configure(onNotification);
    this.lastId = 0;
  }

  configure(onNotification) {
    PushNotification.configure({
      onNotification: onNotification,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      popInitialNotification: true,
    });
  }

  pushMessage(title, start) {return(`${title} begins at ${start}`)}

  // Why such a mess?
  // See: https://github.com/zo0r/react-native-push-notification/issues/259
  pushId(title, start){
    const message = this.pushMessage(title, start)
    if (Platform.OS === 'ios') {
      // string is fine
      return message
    } else {
      // generate unique number in a string
      return message.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0)
        return Math.abs(a & a)
      }, 0).toString()
    }
  }

    //Appears right away 
  localNotification() {
    this.lastId++;
    PushNotification.localNotification({
      title: "Local Notification", 
      message: "My Notification Message", 
      playSound: false, 
      soundName: 'default', 
      actions: '["Yes", "No"]'
    });
  }

  sendLocalNotification(title, message, actions) {
    this.lastId++;
    PushNotification.localNotification({
        title: title,
        message: message,
        playSound: true,
        soundName: 'default',
        actions: actions
    });
  }

  sendScheduledNotification(date, title, message) {
      //this.lastId++;
      PushNotification.localNotificationSchedule({
          id: this.pushId(title, date),
          date: new Date(Date.now()+(date*1000)),
          title: title,
          message: message,
          playSound: true,
          soundName: 'default',
          userInfo: {id: this.pushId(title, date)}
      });
  }

    //Appears after a specified time. App does not have to be open.
  scheduleNotification() {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + (30 * 1000)), //30 seconds
      title: "Scheduled Notification", 
      message: "My Notification Message",
      playSound: true, 
      soundName: 'default', 
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif(id) {
    PushNotification.cancelLocalNotifications({id: id});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}