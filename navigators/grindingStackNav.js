
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

import GrindingScreen from '../screens/grindingScreen';

const GrindingStack = createStackNavigator();

class GrindingStackNav extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (
            <GrindingStack.Navigator initialRouteName="Home">
              <GrindingStack.Screen name="Choose your location" component={GrindingScreen} />
              <GrindingStack.Screen name="Grind Calculator" component={BossScreen} />
            </GrindingStack.Navigator>
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