import PushNotification, {Importance} from 'react-native-push-notification';
import NotificationHandler from './notificationHandler';
import moment from 'moment';

export default class NotifService {
  constructor(onRegister, onNotification) {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    this.createDefaultChannels();

    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });

    //this.createTestNotifications();
    //console.log("Creating test notifs");
    
    PushNotification.getChannels(function(channels) {
      console.log(channels);
    });
  }

  createDefaultChannels() {
    console.log('Default Channle function is called');
    PushNotification.createChannel(
      {
        channelId: "default-channel-id", // (required)
        channelName: `Default channel`, // (required)
        channelDescription: "A default channel", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.createChannel(
      {
        channelId: "sound-channel-id", // (required)
        channelName: `Sound channel`, // (required)
        channelDescription: "A sound channel", // (optional) default: undefined.
        soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel 'sound-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  createTestNotifications() {
    let testDate = moment().add(60, 'seconds'); // in 200 secs
    let another = new Date(Date.now() + 60 * 1000)

    console.log(testDate);

    //this.scheduleNotification(testDate, "TempNotification6", "This is the first test notification");
    //this.scheduleNotification(testDate, "TempNotification7", "This is the second test notification");
    //this.scheduleNotification(testDate, "TempNotification8", "This is the third test notification");
    //this.scheduleNotification(testDate, "TempNotification9", "This is the fourth test notification");

    this.getScheduledLocalNotifications( (array) => {
      console.log(array);
    });

    PushNotification.getChannels((channels) => {
      console.log(channels);
    })
  }

  //TODO:
  // - Check the scheduled notifications for each boss spawn before setting.
  // - (optionally) we can set a global flag to see if notificatons for each boss are set.
  // - create a function to unmount all notifications "PER" boss.
  // - create a function to mount all notifications "PER" boss.
  // - If they swap regions, cancel all and remount.
  testBossNotifications(bossSchedule) {
    this.cancelAll();

    bossSchedule.forEach(element => {
      for(let i=1; i <= 7; i++) {
        bossSpawn = JSON.parse(element['day_'+i])
        if(bossSpawn.length > 0) {
          bossSpawn.forEach((spawn, key) => {
            let time = spawn.split(':');
            let spawnTime = moment().utc().isoWeekday(i).hour(time[0]).minute(time[1]).second(parseInt(0)).local().toDate();
            this.scheduleNotification(spawnTime, element.boss, element.boss+" has spawned!", element.boss+"_"+i+"_"+key);
          })
        }
      }
    });

    //this.scheduleNotification(another, "TempNotification1", "This is the first test notification", 'karanda');
    this.getScheduledLocalNotifications((array) => {
      console.log(array)
    })
  }

  createOrUpdateChannel() {
    this.lastChannelCounter++;
    PushNotification.createChannel(
      {
        channelId: "custom-channel-id", // (required)
        channelName: `Custom channel - Counter: ${this.lastChannelCounter}`, // (required)
        channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  popInitialNotification() {
    PushNotification.popInitialNotification((notification) => console.log('InitialNotication:', notification));
  }

  localNotif(soundName) {
    this.lastId++;
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: soundName ? 'sound-channel-id' : 'default-channel-id',
      ticker: 'My Notification Ticker', // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
      subText: 'This is a subText', // (optional) default: none
      color: 'red', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      
      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

      /* iOS only properties */
      category: '', // (optional) default: empty string
      
      /* iOS and Android properties */
      id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: 'Local Notification', // (optional)
      message: 'My Notification Message', // (required)
      userInfo: { screen: 'home' }, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: !!soundName, // (optional) default: true
      soundName: soundName ? soundName : 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    });
  }

  //scheduleNotif(soundName) {
  //  this.lastId++;
  //  PushNotification.localNotificationSchedule({
  //    date: new Date(Date.now() + 30 * 1000), // in 30 secs
//
  //    /* Android Only Properties */
  //    channelId: soundName ? 'sound-channel-id' : 'default-channel-id',
  //    ticker: 'My Notification Ticker', // (optional)
  //    autoCancel: true, // (optional) default: true
  //    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
  //    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
  //    bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
  //    subText: 'This is a subText', // (optional) default: none
  //    color: 'blue', // (optional) default: system default
  //    vibrate: true, // (optional) default: true
  //    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
  //    tag: 'some_tag', // (optional) add tag to message
  //    group: 'group', // (optional) add group to message
  //    groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
  //    ongoing: false, // (optional) set whether this is an "ongoing" notification
  //    actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
  //    invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
//
  //    when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
  //    usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
  //    timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
  //  
  //    /* iOS only properties */
  //    category: '', // (optional) default: empty string
  //    
  //    /* iOS and Android properties */
  //    id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
  //    title: 'Scheduled Notification', // (optional)
  //    message: 'My Notification Message', // (required)
  //    userInfo: { sceen: "home" }, // (optional) default: {} (using null throws a JSON value '<null>' error)
  //    playSound: !!soundName, // (optional) default: true
  //    soundName: soundName ? soundName : 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
  //    number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
  //  });
  //}

  //SOUND CURRENTLY NOT USED
  scheduleNotification(date, title, message, customID = null) {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      //date: new Date(Date.now()+date), // in date is provided in seconds. (only temp)
      date: date,

      /* Android Only Properties */
      channelId: 'default-channel-id',
      ticker: 'My Notification Ticker', // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: message, // (optional) default: "message" prop
      subText: title, // (optional) default: none
      color: 'blue', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: title, // (optional) add tag to message
      group: 'group', // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    
      /* iOS only properties */
      category: '', // (optional) default: empty string
      
      /* iOS and Android properties */
      id: customID ? customID : this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: title, // (optional)
      message: message, // (required)
      userInfo: { sceen: "home" }, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: 'week'
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  checkActiveChannels(cbk) {
    return PushNotification.getChannels(cbk);
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  //ToDo rework this to new undepreciated function AND allow cancel customID
  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: '' + this.lastId});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  abandonPermissions() {
    PushNotification.abandonPermissions();
  }

  getScheduledLocalNotifications(callback) {
    PushNotification.getScheduledLocalNotifications(callback);
  }

  getDeliveredNotifications(callback) {
    PushNotification.getDeliveredNotifications(callback);
  }
}