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
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import Header from '../components/header';
import { DarkButton } from '../components/darkButton';

import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';

class AccountScreen extends Component {
  render() {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <Header title="My Account" subtitle="USERNAME HERE"/>
                <View style={styles.body}>
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Account Information</Text>
                    <View style={styles.sectionItemWrapper}>
                        <Text style={styles.sectionItem}>Email: <Text>testemail@gmail.com</Text></Text>
                        <DarkButton>change</DarkButton>
                    </View>
                    <View style={styles.sectionItemWrapper}>
                        <Text style={styles.sectionItem}>Username: <Text>USERNAME HERE</Text></Text>
                        <DarkButton>change</DarkButton>
                    </View>
                    <View style={styles.sectionItemWrapper}>
                        <Text style={styles.sectionItem}>Password: <Text>************</Text></Text>
                        <DarkButton>change</DarkButton>
                    </View>
                  </View>
                  <View style={styles.sectionContainer}>
                      <Text style={styles.sectionTitle}>Patreon Status</Text>
                      <Text style={styles.sectionItem}>Not a Patreon</Text>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
        </>
    );
  };
}
  

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'black',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'grey',
  },
  sectionItemWrapper: {
      borderBottomWidth: 0.5,
      borderColor: 'grey',
      flexDirection: 'row'
  },
  sectionItem: {
      flex: 1,
      color: 'white',
      marginTop: 10,
      marginBottom: 10,
  },
  sectionItemActionButton: {
    flex: 1,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'grey',
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
    borderRadius: 8
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
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

export default AccountScreen;
