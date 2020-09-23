import React, { Component } from 'react';
import { View, Text } from 'react-native';
import GoogleLog from '../components/LoginButtons/GoogleLog'

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onFinish = (data) => {
    console.log(data)
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <GoogleLog
          onFinish={(data) => this.onFinish(data) } />
      </View>
    );
  }
}
