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

import images from '../services/images';

/*
Bare header will return the default header with the default styling + titles
*/
function BareHeader(props) {
  return (
    <>
      <ImageBackground
      accessibilityRole={'image'}
      source={require('../images/blackdesertBDO.jpg')}
      style={styles.background}
      imageStyle={styles.imagePosition}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>{props.subtitle}</Text>
      </ImageBackground>
    </>
  );
}

/*
Dynamic header will expect the following props:
* - Dynamic image source IE: '../images/xyz.png' 
* - Dynamic header title
* - Dynamic header sub title
*/
function DynamicHeader(props) {
  return (
    <>
      <ImageBackground
      accessibilityRole={'image'}
      source={images[props.imagesource]}
      style={styles.background}
      imageStyle={styles.imagePosition}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>{props.subtitle}</Text>
      </ImageBackground>
    </>
  );
}

class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.imagesource
        ? <DynamicHeader {...this.props}></DynamicHeader>
        : <BareHeader {...this.props}></BareHeader>}
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
  title: {
      fontSize: 40,
      fontWeight: '600',
      textAlign: 'center',
      color: '#FFFFFF'
  },
  subtitle: {
    fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      color: '#FFFFFF'
  }
});

export default Header;
