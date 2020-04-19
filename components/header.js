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
  ImageBackground,
  StyleSheet,
  Text,
} from 'react-native';

class Header extends Component {
  render(props) {
    return (
      <>
        <ImageBackground
        accessibilityRole={'image'}
        source={require('../images/blackdesertBDO.jpg')}
        style={styles.background}
        imageStyle={styles.imagePosition}>
            <Text style={styles.text}>BDO Boss Scheduler</Text>
        </ImageBackground>
      </>
    );
  };
}
  

const styles = StyleSheet.create({
  background: {
      paddingBottom:40,
      paddingTop:96,
      paddingHorizontal:32,
      backgroundColor: '#444'
  },
  imagePosition: {
      opacity: 0.2,
      overflow: 'visible',
      resizeMode: 'cover',
  },
  text: {
      fontSize: 40,
      fontWeight: '600',
      textAlign: 'center',
      color: '#FFFFFF'
  }
});

export default Header;
