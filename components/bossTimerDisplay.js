/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */
import 'react-native-gesture-handler';

import Schedule from '../config/bossschedule';
import React, { useContext, Component } from 'react';
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
import NotificationService from '../services/notification';
import images from '../services/images';

import { NotificationContext } from '../services/notificationContext';

//this.context is now using the notification context.... honestly this would be much nicer if we were using functional components. We should start a re-write.


class BossTimerDisplay extends Component {

  static contextType = NotificationContext;

  constructor(props) {
    super(props);

    this.state = {
      cache: this.props.cacheInstance,
      boss: this.props.boss,
      timeUntilSpawn: 0,
      wentBackgroundAt: null
    }
  }
  // notif = this.context;

  componentDidMount() {
    this.calculateNextSpawnTime(this.props.boss);
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = currentAppState => {
    const { wentBackgroundAt } = this.state;
    if (currentAppState === 'active' && wentBackgroundAt) {
      //Will fire when the app is coming back from having been in the background.
      //We always want to calculate the next spawn time when the app comes out of the background as it will trickle updates down to the countdown components.
      this.calculateNextSpawnTime(this.props.boss);
      console.log('should recalculate boss spawns: bossTimerDisplay');

    }
    if (currentAppState === 'background') {
      this.setState({ wentBackgroundAt: Date.now() });
      console.log('recognized the app going background: bossTimerDisplay');
    }
  }

  //getNextSpawn(startDay, today, bossSchedule, minDuration = 0) {
//
  //  let durations = [];
//
  //  if (bossSchedule[today > 7 ? today - 7 : today].length > 0) {
//
  //    bossSchedule[today > 7 ? today - 7 : today].forEach((spawn) => {
  //      let needle = moment().utc().isoWeekday(today).hour(spawn.hour).minute(spawn.minute).second(parseInt(0));
  //      let now = moment().utc();
//
  //      minDuration = moment.duration(needle.diff(now)).asHours();
//
  //      if (minDuration > 0) {
  //        durations.push(minDuration);
  //      }
  //    });
//
  //    if (durations.length <= 0) {
  //      //there are no durations here
  //      return this.getNextSpawn(startDay, today + 1, bossSchedule);
  //    }
//
  //    durations.sort((a, b) => a - b);
//
  //    console.log(durations);
//
  //    this.setState((prevState, props) => ({
  //      timeUntilSpawn: durations[0]
  //    }), () => {
  //      console.log("state.timeuntilspawn: " + this.state.timeUntilSpawn)
  //      return;
  //    });
  //  }
  //  else {
  //    return this.getNextSpawn(startDay, today + 1, bossSchedule);
  //  }
  //}


  //New version of get next spawn -- OLD ABOVE -- 
  getNextSpawn(startDay, today, bossSchedule, minDuration = 0) {

    let durations = [];
    
    let bossSpawnsToday = JSON.parse(bossSchedule[today > 7 ? "day_"+(today - 7) : "day_"+today]);

    if (bossSpawnsToday.length > 0) {

      bossSpawnsToday.forEach((spawn) => {
        let time = spawn.split(':');
        let needle = moment().utc().isoWeekday(today).hour(time[0]).minute(time[1]).second(parseInt(0)).local();
        let now = moment().utc().local();

        minDuration = moment.duration(needle.diff(now)).asHours();

        if (minDuration > 0) {
          durations.push(minDuration);
        }
      });

      if (durations.length <= 0) {
        //there are no durations here
        return this.getNextSpawn(startDay, today + 1, bossSchedule);
      }

      durations.sort((a, b) => a - b);

      console.log(durations);


      this.setState((prevState, props) => ({
        timeUntilSpawn: durations[0]
      }), () => {
        console.log("BOSS: "+this.props.boss+" chosen time until spawn: " + this.state.timeUntilSpawn)
        return;
      });
    }
    else {
      return this.getNextSpawn(startDay, today + 1, bossSchedule);
    }
  }

  //note we are binding this in the callback so we have access to props.
  countdownExpired() {
    console.log("NOTICE COUNTDOWN EXPIRED "+this.props.boss)
    this.calculateNextSpawnTime(this.props.boss);
  }

  //WORK IN PROGRESS --- DEPRECIATED MOVED TO PARENT - SEE getBossTimers
  fetchAPIBossTimers(Boss) {
    fetch('https://www.buddy-network.com/api/boss/timers/na', { method: 'GET', headers: {Accept: 'application/json'} })
      .then(response => {
        if(!response.ok) {
          //there was a call error
          console.log("ERROR: "+response.status+" "+response.statusText)
          throw new Error('response not okay from call');
        }
        else {
          return response.json()
        }
      })
      .then(data => {
        //console.log(data.Data[0]['0']);


        data.Data.forEach(element => {
          if (element.boss.toLowerCase() === Boss.toLowerCase()) {
            let temp = element;
            let today = moment().utc().isoWeekday();
            //let parsed = JSON.parse(temp[today > 7 ? today - 7 : today])
            
            this.getNextSpawn(today, today, element, 0);
          }
        });

      });
  }

  getBossTimers(Boss) {
    this.state.cache.peek('schedule').then(data => {
      if(typeof data != 'undefined'){
        //Data is in cache
        console.log(data);
        data.forEach(element => {
          if (element.boss.toLowerCase() === Boss.toLowerCase()) {
            let temp = element;
            let today = moment().utc().isoWeekday();
            //let parsed = JSON.parse(temp[today > 7 ? today - 7 : today])
            
            this.getNextSpawn(today, today, element, 0);
          }
        });
      }
      else {
        //refetch TODO: THIS IS CURRENTLY NOT ASYNC MIGHT NEED TO DO THIS TO OPTIMIZE.
        this.props.refetchCallback()
        this.getBossTimers()
      }
    })
  }

  calculateNextSpawnTime(Boss) {
    //this.fetchAPIBossTimers(Boss);
    this.getBossTimers(Boss)
    const bossSchedule = Schedule[(Boss + "").toLowerCase()];

    let today = moment().utc().isoWeekday();
    //this.getNextSpawn(today, today, bossSchedule, 0);

    if (this.state.notificationID === null) {
      this.setState((prevState, props) => ({
        notificationID: this.notif.lastId + 1
      }), () => {
        if (this.state.timeUntilSpawn > 0) {
          //MOVE THIS TO NEW TIMER - SCHEDULING
          //this.context.scheduleNotification(this.state.timeUntilSpawn * 3600, Boss, Boss + " Has Spawned!");
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
          onPress={() => this.props.navigation.navigate('BossScreen', { bossname: this.props.boss })}
          style={styles.touchable}>
          <ImageBackground
            source={images[this.props.boss]}
            style={styles.image}
            imageStyle={{ borderRadius: 10 }}
          />
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.text}>{this.props.boss}</Text>
            <CountDown secondsRemaining={this.state.timeUntilSpawn * 3600} ended={this.countdownExpired.bind(this)}></CountDown>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}


const styles = StyleSheet.create({

  container: {
    flex: 1
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
