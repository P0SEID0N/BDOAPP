import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DarkButton = (props) => {

    return(
        <TouchableOpacity 
        style={style.sectionItemActionButton}
        onPress={ props.onPress }
        >
            <Text style={{color: 'grey'}}>{ props.children }</Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    sectionItemActionButton: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'grey',
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 8
      }
});

export { DarkButton };