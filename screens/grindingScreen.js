/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useContext, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';

import Header from '../components/header';

import GrindLocation from '../components/grindScreenComponents/grindLocation';

import AccordionInfo from '../components/accordionInfo';

import { NotificationContext } from '../services/notificationContext';

import { promiseFromStorage } from '../services/storage';

class GrindingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      selectedLocation: 'None',
      currentGear: null
    }
    this.handleLocationSelection = this.handleLocationSelection.bind(this)
  }

  static contextType = NotificationContext;

  grindLocations = [
    {name: 'Star’s End', ap: '261', dp: '309', partySize: 1, imageSafeName: 'Vell'},
    {name: 'Star’s End', ap: '261', dp: '309', partySize: 1, imageSafeName: 'Vell'},
    {name: 'Star’s End', ap: '261', dp: '309', partySize: 1, imageSafeName: 'Vell'},
    {name: 'Star’s End', ap: '261', dp: '309', partySize: 1, imageSafeName: 'Vell'},
    {name: 'Star’s End', ap: '261', dp: '309', partySize: 1, imageSafeName: 'Vell'},
    {name: 'Star’s End', ap: '261', dp: '309', partySize: 1, imageSafeName: 'Vell'},
    {name: 'Star’s End', ap: '261', dp: '309', partySize: 1, imageSafeName: 'Vell'},
    {name: 'Star’s End', ap: '261', dp: '309', partySize: 1, imageSafeName: 'Vell'},
    {name: 'Star’s End', ap: '261', dp: '309', partySize: 1, imageSafeName: 'Vell'},
    {name: 'Star’s End', ap: '261', dp: '309', partySize: 1, imageSafeName: 'Vell'},
    {name: 'Star’s End', ap: '261', dp: '309', partySize: 1, imageSafeName: 'Vell'},
  ]

  handleLocationSelection(selectedLoc) {
    console.log('callback fired');
    this.setState((prevState, props) => ({
      step: ++prevState.step,
      selectedLocation: selectedLoc
     }));
  }

  componentDidMount(){
    console.log('component mounted');
    
    this.props.navigation.addListener("focus", () => {


      console.log("screen has focus");
      //rerun the currentGear setup fetch when the screen changes.
      promiseFromStorage('gear').then(data => {
        this.setState((prevState, props) => ({
          currentGear: JSON.parse(data)
        }));
      });

    });
    //this.context.scheduleNotification('data', 'TestNotif', 'Any Message will do');
    //this.context.getScheduledLocalNotifications( (array) => {
    //  console.log(array);
   // });

  promiseFromStorage('gear').then(data => {
    this.setState((prevState, props) => ({
    currentGear: JSON.parse(data)
  }));

   })

    //IN THE FUTURE WE WILL FETCH CURRENT GRIND LOCATIONS FROM THE SERVER
  }

  componentWillUnmount() {
    this.props.navigation.removeListener("focus");
  }

  render() {
    if(this.state.currentGear !== null){
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <Header title="Grind Calculator" subtitle="Track your grind sessions!" />
                <View style={styles.body}>
                  <AccordionInfo headerText="How It Works" contentText=
                  "Step 1: Choose a Grind locationStep 2: Setup the options for that specific grind location 
                  Step 3: When you're ready hit the start timer button, which will start tracking the time of your grind. 
                  Step 4: When you finish grinding or stop for any reason, stop the timer and the application will ask you for your current grind results (trashloot, item drops etc.)
                  Step 5: If you choose to, upload your grind to our cloud server to save your data for future use. 

                  If you would like to know more please read our Grind calculator FAQ online http://www.buddy-network.com/BDObuddy/grindcalculator"
                  />
                  {this.state.step == 1 && <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Choose your grind location</Text>
                    {this.grindLocations.map((l, i) => 
                      <GrindLocation props={this.props} location={l} onHandle={this.handleLocationSelection} key={i}></GrindLocation>
                    )}
                  </View>}
                  {this.state.step == 2 && <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>You're looking at step 2!! currently selected: {this.state.selectedLocation}</Text>
                  </View>}
                  {this.state.step == 3 && <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>You're looking at step 3!!</Text>
                  </View>}
                  {this.state.step == 4 && <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>You're looking at step 4!!</Text>
                  </View>}
                </View>
              </ScrollView>
            </SafeAreaView>
        </>
    );
    }
    else {
      return (
        <>
        <StatusBar barStyle="light-content" />
            <SafeAreaView>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <Header title="Grind Calculator" subtitle="Track your grind sessions!" />
                <View style={styles.body}>
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>OOPS!</Text>
                    <Text style={styles.sectionDescription}>
                     You currently dont have your gear setup. You need to head over to the gear setup screen in order to use the grind calculator.
                    </Text>
                    <Text onPress={() => {this.props.navigation.navigate('My Gear')}}>Gear Screen</Text>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
        </>
      );
    }
  };
}
  

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'grey',
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

export default GrindingScreen;
