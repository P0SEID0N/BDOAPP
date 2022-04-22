import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ImageBackground,
    AppState
  } from 'react-native';

  import images from '../../services/images';

  const GrindLocation = (props) => {

    const { navigation, location, onHandle } = props;

    const buttonPress = (loc) => {
      onHandle(loc);
    }

    return (
        <TouchableOpacity
          onPress={() => {buttonPress(location.name)}}
          style={styles.touchable}>
          <ImageBackground
            source={images[location.imageSafeName]}
            style={styles.image}
            imageStyle={{borderRadius: 10}}
          />
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
             <Text style={styles.text}>{location.name}</Text>   
             <Text style={styles.text}>AP: {location.ap} DP: {location.dp}</Text>
             <Text style={styles.smallText}>Party Size: {location.partySize}</Text>
          </View>
        </TouchableOpacity>
    );
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
        height: 110,
        flex: 1,
        margin: 10,
        borderRadius: 20,
        position: 'relative'
      },
      text: {
        color: '#FFF',
        fontSize: 30,
      },
      smallText: {
        color: '#FFF',
        fontSize: 15,
      }
});

  export default GrindLocation;