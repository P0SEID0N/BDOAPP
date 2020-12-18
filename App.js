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
import SettingsScreen from './screens/settingsScreen';
import AboutScreen from './screens/aboutScreen';
import AccountScreen from './screens/accountScreen';

import SplashScreen from 'react-native-splash-screen'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

class App extends Component {

  componentDidMount(){
    SplashScreen.hide();
  };

  render() {
    return (
      <NavigationContainer theme={darkTheme}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="About" component= {AboutScreen} />
        <Tab.Screen name="Account" component= {AccountScreen} />
      </Tab.Navigator>
      </NavigationContainer>
    );
  };
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
