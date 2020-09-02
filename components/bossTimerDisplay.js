/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */
import 'react-native-gesture-handler';

import Schedule from '../config/bossschedule';
import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  AppState
} from 'react-native';
import moment from 'moment';
import CountDown from './countdown';
import NotificationService from '../services/notification'

class BossTimerDisplay extends Component {

  constructor(props) {
      super(props);

      this.notif = new NotificationService(this.onNotification)

      this.state = {
          boss: this.props.boss,
          timeUntilSpawn: 0,
          notificationID: null,
          wentBackgroundAt: null
      }
  }
  
  componentDidMount(){
      this.calculateNextSpawnTime(this.props.boss);
      AppState.addEventListener('change', this._handleAppStateChange); 
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = currentAppState => {
    const {wentBackgroundAt} = this.state;
    if (currentAppState === 'active' && wentBackgroundAt) {
      //Will fire when the app is coming back from having been in the background.
      //We always want to calculate the next spawn time when the app comes out of the background as it will trickle updates down to the countdown components.
      this.calculateNextSpawnTime(this.props.boss);
      console.log('should recalculate boss spawns: bossTimerDisplay');
    
    }
    if (currentAppState === 'background') {
      this.setState({wentBackgroundAt: Date.now()});
      console.log('recognized the app going background: bossTimerDisplay');
    }
  }

  onNotification = (noti) => {
    Alert.alert(noti.title, noti.message);
  }

  getNextSpawn(startDay, today, bossSchedule, minDuration = 0) {

    let durations = [];

    if(bossSchedule[today > 7 ? today-7:today].length > 0) {
        
       bossSchedule[today>7?today-7:today].forEach((spawn) => {
           let needle = moment().utc().isoWeekday(today).hour(spawn.hour).minute(spawn.minute).second(parseInt(0));
           let now = moment().utc();

           minDuration = moment.duration(needle.diff(now)).asHours();

           if(minDuration > 0) {
             durations.push(minDuration);  
           }
       });

       if(durations.length <= 0) {
           //there are no durations here
           return this.getNextSpawn(startDay, today+1, bossSchedule);
       }

       durations.sort((a,b) => a-b);

       console.log(durations);

       this.setState((prevState, props) => ({
        timeUntilSpawn: durations[0]
       }), () => {
          console.log("state.timeuntilspawn: "+this.state.timeUntilSpawn)
          return;
       });
    }
    else {
        return this.getNextSpawn(startDay, today+1, bossSchedule);
    }
  }  

  calculateNextSpawnTime(Boss) {
    const bossSchedule = Schedule[(Boss+"").toLowerCase()];

    let today = moment().utc().isoWeekday();
    this.getNextSpawn(today, today, bossSchedule, 0);

    if(this.state.notificationID === null) {
        this.setState((prevState, props) => ({
            notificationID: this.notif.lastId + 1
           }), () => {
               if(this.state.timeUntilSpawn > 0) {
                  this.notif.sendScheduledNotification(this.state.timeUntilSpawn*3600, Boss, Boss+" Has spawned!");
               }
              
           });
    }

  }
  //<Text style={styles.text}>{this.state.timeUntilSpawn}</Text>
  // <Countdown secondsRemaining={this.state.timeUntilSpawn*3600}></Countdown>

  render(props) {
    return (
        <View style={styles.container}>
        <TouchableOpacity
        onPress={this.notif.scheduleNotification}
          style={styles.touchable}>
          <ImageBackground
            source={require('../images/blackdesertBDO.jpg')}
            style={styles.image}
            imageStyle={{borderRadius: 10}}
          />
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
             <Text style={styles.text}>{this.props.boss}</Text>   
             <CountDown secondsRemaining={this.state.timeUntilSpawn*3600}></CountDown>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}
  

const styles = StyleSheet.create({

    container: {
        flex:1
    },
    view: {
        position: 'absolute',
        backgroundColor: 'transparent'
      },
      image: {  
        position: 'absolute',
        height: "100%",
        width: "100%",
        overflow: "hidden"
      },
      touchable: { 
        backgroundColor: '#FFF',
        height: 90,
        flex: 1,
        margin: 10,
        borderRadius: 20,
        position: 'relative'
      },
      text: {
        color: '#FFF',
        fontSize: 30,
      }
});

export default BossTimerDisplay;
