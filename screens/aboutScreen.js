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
} from 'react-native';

import Header from '../components/header';

class AboutScreen extends Component {
  render() {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <Header title="About BDO Buddy" subtitle="roadmap and beyond!"/>
                <View style={styles.body}>
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>About the BuddyNetwork</Text>
                    <Text style={styles.sectionDescription}>
                        The BuddyNetwork efforts to become a vast network of knowledge and guides that we hope will help players play the games they love and enjoy.
                        We are making an immense effort to make absolutely certain that our guides/tools that we give players of the games we choose to support are meaningful and necessary tools and or information that we feel the developer has left out.
                        If you enjoy our applications, use them frequently or would like to help us grow in a substantial way please consider becoming a <Text style={styles.highlight}>Patreon</Text> 
                    </Text>
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
    color: 'black',
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

export default AboutScreen;
