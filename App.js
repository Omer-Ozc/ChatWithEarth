import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/containers/LoginPage'
import MainPage from './src/containers/MainPage'
import RegisterPage from './src/containers/RegisterPage'
import RegisterProfilePage from './src/containers/RegisterProfilePage'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {

    const Stack = createStackNavigator();


    return (
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
          <Stack.Screen name="RegisterProfilePage" component={RegisterProfilePage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
