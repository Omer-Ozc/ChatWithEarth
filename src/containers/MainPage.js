import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import FirebaseSimpleService from '../Firebase/FirebaseSimpleService'
import FirebaseGetService from '../Firebase/FirebaseGetService'


export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    FirebaseSimpleService.setOnlineMethod()
    this.fetch()
  }

  fetch = async() => {
    let userAge = await FirebaseGetService.getIsUserRegistered()
    console.log("User Aggee", userAge)
    if(userAge === null){
      this.props.navigation.navigate('RegisterProfilePage')
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Main PAGE</Text>
      </View>
    );
  }
}
