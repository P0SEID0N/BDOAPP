
/*
* The intention of the stack navigator here is to allow us to jump from timer displays to boss view.
* This will likely be expanded to include further layouts as we move towards a drawer navigation eventually.
* Or simply more stacks.
* This implementation is TEMPORARY
*/

import 'react-native-gesture-handler';
import React, {Component} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/homeScreen';
import BossScreen from '../screens/bossScreen';

const HomeStack = createStackNavigator();

class HomeStackNav extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (
            <HomeStack.Navigator initialRouteName="Home">
              <HomeStack.Screen name="Home" component={HomeScreen} />
              <HomeStack.Screen name="BossScreen" component={BossScreen} />
            </HomeStack.Navigator>
          );
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

  export default HomeStackNav;