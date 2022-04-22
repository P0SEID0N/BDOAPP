/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';

import HomeScreen from './screens/homeScreen';
import HomeStackNav from './navigators/homeStackNav';
import GrindingScreen from './screens/grindingScreen';
import AboutScreen from './screens/aboutScreen';
import AccountScreen from './screens/accountScreen';
import GearScreen from './screens/gearScreen';

import SplashScreen from 'react-native-splash-screen'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NotifService from './services/notifservice';
import { NotificationContext } from './services/notificationContext';


const Tab = createBottomTabNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.notif = new NotifService(
      //this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  componentDidMount(){
    SplashScreen.hide();
  };

  render() {
    return (
      <NotificationContext.Provider value={this.notif}>
        <NavigationContainer theme={darkTheme}>
          <Tab.Navigator>
            <Tab.Screen name="Timers" component={HomeStackNav}/>
            <Tab.Screen name="Grinding" component={GrindingScreen} />
            <Tab.Screen name="My Gear" component= {GearScreen} />
            <Tab.Screen name="Account" component= {AccountScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </NotificationContext.Provider>
    );
  };

  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }
}

const darkTheme = {
  dark: true,
  colors: {
    primary: 'white',
    background: 'black',
    card: 'black',
    text: 'white',
    border: 'grey',
  },
};
  

//const styles = StyleSheet.create({
//  
//});

export default App;
