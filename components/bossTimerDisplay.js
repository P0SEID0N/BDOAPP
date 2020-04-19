/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import Schedule from '../config/bossschedule';
import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import moment from 'moment';

class BossTimerDisplay extends Component {

  constructor(props) {
      super(props);

      this.state = {
          boss: this.props.boss,
          timeUntilSpawn: ''
      }
  }
  
  componentDidMount(){
      this.calculateNextSpawnTime(this.props.boss);
  }

  getNextSpawn(startDay, today, bossSchedule, minDuration = 0) {

    let durations = [];

    if(bossSchedule[today > 7 ? today-7:today].length > 0) {
        
       bossSchedule[today>7?today-7:today].forEach((spawn) => {
           let needle = moment().utc().isoWeekday(today).hour(spawn.hour).minute(spawn.minute).second(parseInt(0));
           let now = moment().utc();

           minDuration = moment.duration(needle.diff(now)).asHours();

           durations.push(minDuration);
       });

       durations.sort((a,b) => a-b);

       this.setState((prevState, props) => ({
        timeUntilSpawn: durations[0]
       }), () => {
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

  }

  render(props) {
    return (
        <View style={styles.container}>
        <TouchableOpacity
          style={styles.touchable}>
          <ImageBackground
            source={require('../images/blackdesertBDO.jpg')}
            style={styles.image}
            imageStyle={{borderRadius: 10}}
          />
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.text}>{this.state.timeUntilSpawn}</Text>
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
