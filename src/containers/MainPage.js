import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import FirebaseSimpleService from '../Firebase/FirebaseSimpleService'
import FirebaseGetService from '../Firebase/FirebaseGetService'
import CHeader from '../components/views/CHeader'
import AsyncStorage from '@react-native-community/async-storage';
import FriendListItem from '../components/ListItem/FriendListItem'
import Geolocation from '@react-native-community/geolocation';




export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileObject :'',
    };
  }

  componentDidMount() {
    this.serviceFetch()
    this.getData()
    this.getMap()
    FirebaseSimpleService.setOnlineMethod()

  }

  serviceFetch = async () => {
    let userData = await FirebaseGetService.getIsUserRegistered()
    if (userData === null) {
      this.props.navigation.navigate('RegisterProfilePage')
    }
    this.setState({profileObject : await FirebaseGetService.getIsUserRegistered()})
  }

  goToBackPage() {
    this.props.navigation.goBack()
  }

  navigation() {
    this.props.navigation.navigate("AddFriend")
  }
  navigateToMap(){
    this.props.navigation.navigate("MapPage")

  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@FriendList')
      if (value !== null) {
        this.setState({ friendList: value })
      }
    } catch (e) {
      console.log(e)
    }
  }

  NavigateToChat(uid,name,lastName){
    this.props.navigation.navigate("ChatPage",{
      uid,
      name,
      lastName
    })
  }

  setMapCoordsAndIsOnlineMethod(info){
    FirebaseSimpleService.setOnlineMethod(info.coords.latitude, info.coords.longitude)
  }
  
  getMap = () => {
    Geolocation.getCurrentPosition(
      (info) => this.setMapCoordsAndIsOnlineMethod(info),
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
      },
    );
    return <></>;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <CHeader
          headerTitle='Main Page'
          backPage={() => this.goToBackPage()}
          navigatons={() => this.navigation()}
          />

        <View>

          <FriendListItem
          name = {this.state.profileObject.name  != null ? this.state.profileObject.name : "Name"}
          lastName = {this.state.profileObject.lastName != null ? this.state.profileObject.lastName : "LastName"}
          ChatPage = {(uid,name,lastName) => this.NavigateToChat(uid,name,lastName)}
          navigateMap = {() => this.navigateToMap()} />

        </View>

      </View>

    );
  }
}