/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native';

import Header from '../components/header';
import BossTimerDisplay from '../components/bossTimerDisplay';

import {cacheStore} from '../services/storage';
//import PushNotification from 'react-native-push-notification';

import { NotificationContext } from '../services/notificationContext';

class HomeScreen extends Component {

  static contextType = NotificationContext;

    constructor(props) {
        super(props);

        this.state = {
          cache: new cacheStore('BDOAPP')
        }
    }

    componentDidMount() {
        //Will be called when the component mounts during first initial load. We want to clear out the old notifications if they exist.
        //PushNotification.cancelAllLocalNotifications();
        //PushNotification.cancelLocalNotifications();
        //this.context.localNotif();
        this.fetchAPIBossTimers()

        //testing the adapter's ability to create notifications for ALL boss spawns.
        //Will rework later to fit to user's specifications.
        this.state.cache.peek('schedule').then(data => {
          if(typeof data != 'undefined') {
            console.log("IMPLEMENTING TEST BOSS NOTIFS")
            //this.state.bossNotificationAdapter.testBossNotifications(data)
            this.context.testBossNotifications(data)
          }
          console.log("SKIPPING TEST BOSS NOTIFS")
        })
      }

    fetchAPIBossTimers() {
      this.state.cache.peek('schedule').then(data => {
        //console.log(data)
        if(typeof data == 'undefined'){
        console.log('RUNNING FETCH')
      fetch('https://www.buddy-network.com/api/boss/timers/na', { method: 'GET', headers: {Accept: 'application/json'} })
        .then(response => {
          if(response.ok) {
            return response.json()
          }
          else {
            console.log("ERROR: "+response.status)
            throw new Error("Response code "+response.status+" fatal call error.")
          }
        })
        .then(data => {
          //console.log(data.Data[0]['0']);

          this.state.cache.set('schedule', data.Data);
  
          //data.Data.forEach(element => {
            //if (element.boss.toLowerCase() === Boss.toLowerCase()) {
              //let temp = element;
              //let today = moment().utc().isoWeekday();
              //let parsed = JSON.parse(temp[today > 7 ? today - 7 : today])
              
              //this.getNextSpawn(today, today, element, 0);

              //Cache the return and only refetch if its not in cache.
            //}
          //});
  
        });
      }else {
        console.log("Schedule is in cache, ABORTING FETCH")
      }
      })
      
    }  


    /* 
    * For the sake of functionality, we want to improve the spawn calculation time. It is fine if each bosstimer individually calculates the spawn
    * however it is not good to have each bosstimer component calling the schedule down every single time the app loads. This will create huge lag.
    */
      
    //getNextSpawn(startDay, today, bossSchedule, minDuration = 0) {
    //  let durations = [];
    //  
    //  let bossSpawnsToday = JSON.parse(bossSchedule[today > 7 ? "day_"+(today - 7) : "day_"+today]);
    //  console.log(bossSpawnsToday);
  //
    //  if (bossSpawnsToday.length > 0) {
  //
    //    bossSpawnsToday.forEach((spawn) => {
    //      let time = spawn.split(':');
    //      let needle = moment().utc().isoWeekday(today).hour(time[0]).minute(time[1]).second(parseInt(0)).local();
    //      let now = moment().utc().local();
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
    //      console.log("TESTING: state.timeuntilspawn: " + this.state.timeUntilSpawn)
    //      return;
    //    });
    //  }
    //  else {
    //    return this.getNextSpawn(startDay, today + 1, bossSchedule);
    //  }
    //}

  render() {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <Header title="BDO Buddy" subtitle="Boss Timers"/>
                <View style={{flexDirection: 'column', backgroundColor:'black'}}>
                  <BossTimerDisplay {...this.props} boss="Karanda" bossIdentifier="1" refetchCallback={this.fetchAPIBossTimers.bind(this)} cacheInstance={this.state.cache}></BossTimerDisplay>
                  <BossTimerDisplay {...this.props} boss="Kzarka" bossIdentifier="2" refetchCallback={this.fetchAPIBossTimers.bind(this)} cacheInstance={this.state.cache}></BossTimerDisplay>
                  <BossTimerDisplay {...this.props} boss="Kutum" bossIdentifier="3" refetchCallback={this.fetchAPIBossTimers.bind(this)} cacheInstance={this.state.cache}></BossTimerDisplay>
                  <BossTimerDisplay {...this.props} boss="Nouver" bossIdentifier="4" refetchCallback={this.fetchAPIBossTimers.bind(this)} cacheInstance={this.state.cache}></BossTimerDisplay>
                  <BossTimerDisplay {...this.props} boss="Garmoth" bossIdentifier="5" refetchCallback={this.fetchAPIBossTimers.bind(this)} cacheInstance={this.state.cache}></BossTimerDisplay>
                  <BossTimerDisplay {...this.props} boss="Vell" bossIdentifier="6" refetchCallback={this.fetchAPIBossTimers.bind(this)} cacheInstance={this.state.cache}></BossTimerDisplay>
                  <BossTimerDisplay {...this.props} boss="Offin" bossIdentifier="7" refetchCallback={this.fetchAPIBossTimers.bind(this)} cacheInstance={this.state.cache}></BossTimerDisplay>
                </View>
              </ScrollView>
            </SafeAreaView>
        </>
    );
  };
}
  

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "black",
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'black',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default HomeScreen;
