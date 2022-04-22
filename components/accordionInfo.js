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

  const AccordionInfo = (props) => {
      
    const [visibility, toggleVisibility] = useState(false);

    const {headerText, contentText, BgColor} = props;

    const handleToggle = () => {
        //will handle the onclick event for the dropdown
        visibility ? toggleVisibility(false) : toggleVisibility(true)
    }

        return(
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => handleToggle()}
                    style={[styles.headerButtonStyle, {backgroundColor:'#434343', flex:1, flexDirection:'row'}]}
                >
                    <Text style={{color:'white', flex: 1}}>{headerText}</Text>
                    <Text style={{flex:1, justifyContent:'flex-end', textAlign:'right'}}>?</Text>
                </TouchableOpacity>
                {visibility && contentText && <Text style={[styles.toggleAbleView, {backgroundColor:'#434343'}]}>
                  {contentText}
                </Text>}
            </View>
        )
  }

  const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: 32,
        paddingHorizontal: 24
    },
    toggleAbleView: {
        color:'white',
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    headerButtonStyle: {
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
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

  export default AccordionInfo;