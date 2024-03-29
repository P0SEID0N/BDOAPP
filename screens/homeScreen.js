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

import PushNotification from 'react-native-push-notification';

class HomeScreen extends Component {

    state = {
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //Will be called when the component mounts during first initial load. We want to clear out the old notifications if they exist.
        PushNotification.cancelAllLocalNotifications();
        //PushNotification.cancelLocalNotifications();
      }

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
                  <BossTimerDisplay {...this.props} boss="Karanda" bossIdentifier="1"></BossTimerDisplay>
                  <BossTimerDisplay {...this.props} boss="Kzarka" bossIdentifier="2"></BossTimerDisplay>
                  <BossTimerDisplay {...this.props} boss="Kutum" bossIdentifier="3"></BossTimerDisplay>
                  <BossTimerDisplay {...this.props} boss="Nouver" bossIdentifier="4"></BossTimerDisplay>
                  <BossTimerDisplay {...this.props} boss="Garmoth" bossIdentifier="5"></BossTimerDisplay>
                  <BossTimerDisplay {...this.props} boss="Vell" bossIdentifier="6"></BossTimerDisplay>
                  <BossTimerDisplay {...this.props} boss="Offin" bossIdentifier="7"></BossTimerDisplay>
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
