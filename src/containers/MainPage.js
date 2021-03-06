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
      profileObject: '',
      counts: 0,
      refresh: false
    };
  }

  componentDidMount() {
    this.serviceFetch()
    this.getData()
    this.getMap()
    FirebaseSimpleService.setOnlineMethod()

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      var RandomNumber = Math.floor(Math.random() * 100) + 1;
      this.setState({ counts: RandomNumber })
      this.getData()
    });


  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  serviceFetch = async () => {
    let userData = await FirebaseGetService.getIsUserRegistered()
    if (userData === null) {
      this.props.navigation.navigate('RegisterProfilePage')
    }
    this.setState({ profileObject: await FirebaseGetService.getIsUserRegistered() })
  }

  goToBackPage() {
    this.props.navigation.goBack()
  }
  navigation() {
    this.props.navigation.navigate("AddFriend")
  }
  navigateToMap() {
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


  NavigateToChat(uid, name, lastName, userImage) {
    this.props.navigation.navigate("ChatPage", {
      uid,
      name,
      lastName,
      userImage
    })
  }

  setMapCoordsAndIsOnlineMethod(info) {
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

  goToLoginPage() {
    this.props.navigation.navigate("LoginPage")
  }

  sendRandomUserToAddPage(uid, name, lastName) {
    this.props.navigation.navigate("AddFriend", {
      uid,
      name,
      lastName
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <CHeader
          showExit="on"
          name={this.state.profileObject != null ? this.state.profileObject.name : "Name"}
          lastName={this.state.profileObject != null ? this.state.profileObject.lastName : "LastName"}
          uid={this.state.profileObject != null ? this.state.profileObject.uid : "uid"}
          age={this.state.profileObject != null ? this.state.profileObject.age : "age"}
          showMap="on"
          showGoBack="off"
          headerTitle='Chats'
          backPage={() => this.goToBackPage()}
          navigatons={() => this.navigation()}
          navigatonsToMap={() => this.navigateToMap()}
          goToLoginPage={() => this.goToLoginPage()}
        />
        <View>

          <FriendListItem
            counter={this.state.counts}
            ChatPage={(uid, name, lastName, userImage) => this.NavigateToChat(uid, name, lastName, userImage)}
            navigateMap={() => this.navigateToMap()}
            navigateToAddFriend={() => this.navigation()}
            navigateToMap={() => this.navigateToMap()}
            sendRandomUserToAddPage={(uid, name, lastName) => this.sendRandomUserToAddPage(uid, name, lastName)}
            edit = {(uid,name,lastName) => this.sendRandomUserToAddPage(uid, name, lastName) }
          />

        </View>

      </View>

    );
  }
}