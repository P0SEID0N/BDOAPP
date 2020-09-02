/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  AppState
} from 'react-native';

class Countdown extends Component {

    state = {
        lastCount: null,
        countdownTime: this.props.secondsRemaining,
        wentBackgroundAt: null
    }

  constructor(props) {
      super(props);

      this.timer = setInterval(() => {this.intervalUpdate()}, 1000);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    //this.timer = setInterval(() => {this.intervalUpdate()}, 1000)
  }

  componentWillUnmount() {
      clearInterval(this.timer);
      AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = currentAppState => {
    const {wentBackgroundAt} = this.state;
    if (currentAppState === 'active' && wentBackgroundAt) {
      const diff = (Date.now() - wentBackgroundAt) / 1000.0;
      this.setState({countdownTime: this.state.countdownTime - diff});
    
    }
    if (currentAppState === 'background') {
      this.setState({wentBackgroundAt: Date.now()});
    }
  }

  componentDidUpdate(prevProps, prevState) {
      //Because of the math we do to get the values for the numbers, the state sometimes doesnt update before the component mounts
      //This will check to see if the state was set properly before the countdown started
      //If it hasnt, it will jump start it for us.
    if (this.state.lastCount === null && this.state.countdownTime === 0) {
      this.setState({
        countdownTime: this.props.secondsRemaining,
      });
    }
  }

  //Formatting functions to exclude a value if it is 0 we dont want 0h 32m 12s we just want 32m 12s
  h(h) {
      if(h > 0) 
        return <>{h}h</>;
  }
  m(m) {
      if(m > 0)
        return <>{m}m</>;
  }
  s(s) {
      if(s)
        return <>{s}s</>;
  }

  getTimeForDisplay() {

    let sec = this.state.countdownTime;

    let hours = Math.floor(sec / (60 * 60));

    let divisor_for_minutes = sec % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    return <Text style={styles.text}> {this.h(hours)} {this.m(minutes)} {this.s(seconds)}</Text>;
  }

  intervalUpdate() {

    if(this.state.countdownTime === this.state.lastCount) {
        return;
    }

    if(this.state.countdownTime >= 0) {
          this.setState({
              lastCount: this.state.countdownTime,
              countdownTime: this.state.countdownTime - 1
            }); 
    }
    if(this.state.countdownTime === 0 && this.state.lastCount === 1) {
        //Timer finished
        clearInterval(this.timer);
    }
  }

  render(props) {
    return (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {this.getTimeForDisplay()}
          </View>
    );
  };
}
  

const styles = StyleSheet.create({

    container: {
        flex:1
    },
      image: {  
        position: 'absolute',
        height: "100%",
        width: "100%",
        overflow: "hidden"
      },
      text: {
        color: '#FFF',
        fontSize: 30,
      }
});

export default Countdown;
