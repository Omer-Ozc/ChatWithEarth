import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity, Button, Image } from 'react-native';
import CHeader from '../components/views/CHeader'
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import FirebaseSimpleService from '../Firebase/FirebaseSimpleService'
import FirebaseGetService from '../Firebase/FirebaseGetService'
import ProfilePopup from '../components/views/ProfilePopup'


let initialRegion = {
  latitude: 35.9025,
  longitude: 25.90902,
  latitudeDelta: 42.02683,
  longitudeDelta: 44.5742,
};


export default class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: [],
      isUserOnlineAndMapCoords: [],
      isShow: false,
      profile: '',
      mapPhoto: []
    };
  }

  goToBackPage() {
    this.props.navigation.navigate("MainPage")
  }

  componentDidMount = async () => {
    const MapUsers = await FirebaseGetService.getUserAllCoordsAndIsOnline()
    const map = Object.keys(MapUsers)
    this.setState({ count: map })
    await this.fetchAllImage()
    this.setState({ isUserOnlineAndMapCoords: MapUsers })

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

  setMapCoordsAndIsOnlineMethod(info) {
    FirebaseSimpleService.setOnlineMethod(info.coords.latitude, info.coords.longitude)
  }

  btnPressed(uid, name, lastName, age) {
    let profile = {
      uid: uid,
      name: name,
      lastName: lastName,
      age: age
    }

    this.setState({ profile: profile })
    this.setState({ isShow: true })
  }

  showPopup() {
    if (this.state.isShow) {
      return (
        <ProfilePopup
          uid={this.state.profile.uid}
          name={this.state.profile.name}
          lastName={this.state.profile.lastName}
          age={this.state.profile.age}
          closePopup={() => this.closePopup()}
          goToChatPage={(uid, name, lastName) => this.goToChatPage(uid, name, lastName)}
        />)
    }
    else {
      return null
    }
  }

  fetchAllImage = async () => {
    let userPhotoArray =[]
    for (let i = 0; i < this.state.count.length; i++) {
     userPhotoArray[i] = await FirebaseGetService.getUserImage(this.state.count[i])
    }
    this.setState({ mapPhoto: userPhotoArray })
    console.log(this.state.mapPhoto)
  }

  goToChatPage(uid, name, lastName) {
    this.props.navigation.navigate("ChatPage", {
      uid,
      name,
      lastName
    })
    this.setState({ isShow: false })
  }
  closePopup() {
    this.setState({ isShow: false })
  }

  setMarkers() {
    return this.state.count.map((item, index) => {

      if (this.state.isUserOnlineAndMapCoords != "") {
        if (this.state.isUserOnlineAndMapCoords[item].isOnline) {
          let Coords = {
            latitude: this.state.isUserOnlineAndMapCoords[item].latitude,
            longitude: this.state.isUserOnlineAndMapCoords[item].longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };


          let uid = item
          let name = this.state.isUserOnlineAndMapCoords[item].name
          let lastName = this.state.isUserOnlineAndMapCoords[item].lastName
          let age = this.state.isUserOnlineAndMapCoords[item].age
          
          return (<Marker coordinate={Coords}>
            {this.state.mapPhoto[index] != null ? 
            <Image
            source = {{ uri: this.state.mapPhoto[index], }}
            style = {{width:40, height:40, borderRadius:40}}/>
            :
            <Image
            source = {require('../res/images/personicon.png')}
            style = {{width:50, height:50, borderRadius:50}}/> }
            <Callout
              onPress={() => this.btnPressed(uid, name, lastName, age)}>
              <View style={{ alignItems: 'center', }}>
                <Text>{name} {lastName} </Text>
                <Text style={{ color: "red" }}>Profili Gör</Text>
              </View>
            </Callout>
          </Marker>
          )
        }
      }
      return (
        null
      )
    })

  }


  render() {
    return (
      <View style={{ flex: 1 }}>

        {this.showPopup()}
        <CHeader
          headerTitle="Chat With Earth"
          showPlus="off"
          backPage={() => this.goToBackPage()}
        />

        {this.getMap()}
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={initialRegion}>
          {this.setMarkers()}
        </MapView>

      </View>
    );
  }
}
