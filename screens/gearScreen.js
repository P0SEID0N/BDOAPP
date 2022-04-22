/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
 import React, {Component, useState, useEffect} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   TextInput,
   StatusBar,
   TouchableOpacity,
 } from 'react-native';

 import DropDownPicker from 'react-native-dropdown-picker';
 import { classes } from '../config/availableClasses';
 import { handles } from '../config/errorTypes';
 
 import Header from '../components/header';

 import { setStorage, getFromStorage, promiseFromStorage } from '../services/storage';
 
const GearScreen = () => {


    const [AP, setAP] = useState();
    const [AAP, setAAP] = useState();
    const [DP, setDP] = useState();
    const [error, setError] = useState(handles);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(classes);

    const saveData = () => {
      //saves your ap,aap,class,dp to local storage
      //TODO: Upload this data to the server

      //Check validation
      if(error.AP_ERROR || error.AAP_ERROR || error.DP_ERROR || value == null) {
        alert('Some of the data you have provided is incorrect, you must choose a class and fill out the AP AAP and DP form fields to proceed');
        return;
      }
        //SetStorage, this will even update the current local storage if the key exists, if it doesnt it will create new.
        setStorage('gear', JSON.stringify({AP: AP, AAP: AAP, DP: DP, class: value})).then(data => {
          alert('Gear Data Saved!');
        });
    }
    
    const loadDataFromStorage = () => {
      //On first render load gear from storage into fields
      promiseFromStorage('gear').then(data => {
        if(data) {
          let gear = JSON.parse(data);
          console.log(gear);
          //Set the state variables
          setAP(gear.AP);
          setAAP(gear.AAP);
          setDP(gear.DP);
          setValue(gear.class);
        }
      });
    }

    useEffect(() => {
      console.log('loading from storage');
      loadDataFromStorage();
    }, []);

    useEffect(() => {
        // Validate the numbers submitted to the AP, AAP and DP form field

        //AP VALIDATION
        if(AP > 350) {
          setError(error => ({...error, AP_ERROR: true}));
        }
        else if(AP < 350 && error.AP_ERROR) {
          setError(error => ({...error, AP_ERROR: false}));
        }

        //AAP VALIDATION
        if(AAP > 350) {
          setError(error => ({...error, AAP_ERROR: true}));
        }
        else if(AAP < 350 && error.AAP_ERROR) {
          setError(error => ({...error, AAP_ERROR: false}));
        }

        //DP VALIDATION
        if(DP > 450) {
          setError(error => ({...error, DP_ERROR: true}));
        }
        else if(DP < 450 && error.DP_ERROR) {
          setError(error => ({...error, DP_ERROR: false}));
        }

    }, [AP, AAP, DP]);

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{flex: 1, flexDirection:'column'}}>
                <Header title="My Gear" subtitle="Gear Tracking and Input"/>
                <View style={styles.body}>
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>How the Gear Tracker works</Text>
                    <Text style={styles.sectionDescription}>
                        At the moment the gear tracker is a work in progress, however for the rest of our application to work we need to have a general
                        idea of what your gear looks like (at least AP/AAP/DP) so we can correctly evaluate things like grind efficiency and help you choose which spots
                        that would be good to grind at for money at your current gear.
                    </Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <DropDownPicker
                        style={styles.dropDownStyle}
                        placeholder="Choose your class"
                        mode="BADGE"
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        zIndex={3000}
                        zIndexInverse={1000}
                    />
                   </View>
                   <View style={{zIndex:-5, flex:1, flexDirection:'row'}}>
                    <TextInput
                    style={[styles.textInputStyle, error.AP_ERROR ? styles.textInputInvalid : '']}
                    placeholder="AP"
                    keyboardType='numeric'
                    value={AP}
                    onChangeText={text => setAP(text)}
                    />
                    <TextInput
                    style={[styles.textInputStyle, error.AAP_ERROR ? styles.textInputInvalid : '']}
                    placeholder="AAP"
                    keyboardType='numeric'
                    value={AAP}
                    onChangeText={text => setAAP(text)}
                    />
                    <TextInput
                    style={[styles.textInputStyle, error.DP_ERROR ? styles.textInputInvalid : '']}
                    placeholder="DP"
                    keyboardType='numeric'
                    value={DP}
                    onChangeText={text => setDP(text)}
                    />
                  </View>
                  <View style={{flex:1, zIndex:-6, flexDirection:'row', alignItems:'flex-end'}}>
                      <TouchableOpacity
                        style={styles.saveButtonStyle}
                        onPress={() => saveData()}
                      >
                          <Text style={{color: 'white'}}>Save</Text>
                      </TouchableOpacity>
                  </View>
                </View>
            </SafeAreaView>
        </>
    );

 }
   
 
 const styles = StyleSheet.create({
   saveButtonStyle: {
        flex:1,
        height: 70,
        alignItems:'center',
        backgroundColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        borderColor: 'grey',
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 10,
   },  
   dropDownStyle: {
       margin:10
   },
   textInputStyle: {
       margin:10,
       borderRadius:10,
       flex:1,
       textAlign: 'center',
       maxHeight:50,
       backgroundColor:'white'
   },
   textInputInvalid: {
     borderColor:'red',
     borderWidth:1
   },
   scrollView: {
     backgroundColor: 'white',
   },
   engine: {
     position: 'absolute',
     right: 0,
   },
   body: {
     flex: 1,
     flexDirection: 'column',
     backgroundColor: 'black',
   },
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
     color: 'white',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
     color: 'white',
   },
   highlight: {
     fontWeight: '700',
   },
   footer: {
     color: 'black',
     fontSize: 12,
     fontWeight: '600',
     padding: 4,
     paddingRight: 12,
     textAlign: 'right',
   },
 });
 
 export default GearScreen;
 