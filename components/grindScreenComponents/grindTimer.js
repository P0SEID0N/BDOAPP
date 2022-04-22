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

  const GrindTimer = (props) => {

    //Grind timer screen, will also include information about the drops that can be found at that grind spot

    const { location } = props;

    const buttonPress = (loc) => {
      onHandle(loc);
    }

    if(location){
        return (
            <View>
                <View><Text>Selected Grind Spot: {location}</Text></View>
                <View>
                    <Text>Drop table for {location}:</Text>
                    <View>
                        {{/* add some sort of trash/loot drop table */}}
                    </View>
                </View>
            </View>
        );
    }
    else {
        return(
            <View>
                <Text>An error occured, please go back and select an appropriate grindspot in order to use the calculator properly.</Text>
            </View>
        )
    }
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

  export default GrindTimer;