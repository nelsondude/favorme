import React from 'react';
import {
  Image,
  Platform,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ListView,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import FeedScreen from '../screens/FeedScreen';
import ExchangeScreen from '../screens/ExchangeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MainTabNavigator from '../navigation/MainTabNavigator';


const App = StackNavigator({
  Home: { screen: HomeScreen },
  Feed: { screen: FeedScreen },
  Exchange: { screen: ExchangeScreen },
  Settings: { screen: SettingsScreen },
  MainTab: { screen: MainTabNavigator},
});

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state  = {
      username: '',
      password: ''
    };
  }
  static navigationOptions = {
    title: "Login"
  };

  test = () => {
	console.log('here');
	this.props.navigation.navigate('MainTab');
  };

  apiRequest = () => {
   fetch('https://favor-me.herokuapp.com/api/accounts/login/token/',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: this.state.username,
      password: this.state.password
    })
   })
     .then(res => res.json())
     .then(resp => {
       console.log(resp.token);
       if(resp){
          try {
            console.log('are u working');
             AsyncStorage.setItem('id_token', resp.token);
             this.props.navigation.navigate('MainTab')
            } catch (error) {
              console.log(error);
            }
       }
     })
     .catch(function(error) {
       console.log('There has been a problem with your fetch operation: ' + error.message);
     });
   };

 

  render() {
    return (
      <View style={styles.container}>
		<View style={[styles.row, {marginTop:100}]}>
          <TextInput
          	placeholder='Username'
           	style={styles.textField}
           	onChangeText={(text) => this.setState({username: text})}
           	value={this.state.username}
          />
		</View>
		<View style={styles.row}>
           <TextInput
           placeholder='Password' type = 'password'
           style={styles.textField }
           onChangeText={(text) => this.setState({password: text})}
           value={this.state.password}
          />
		</View>
		<TouchableOpacity onPress={this.test}>
		<View style={styles.row}>
          <Image
          source = {require('../images/login-button.png')}
          style={{resizeMode: 'contain', width:300,marginTop:100}}
          />
		</View>
        </TouchableOpacity>
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  row: {
	marginTop: 15,
	marginBottom: 15,
	alignItems:'center',
  },
  textField: {
	height: 40,
	width: 250,
	borderColor: 'gray',
	borderWidth: 1,
  },
});
