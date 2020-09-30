import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity, Button } from 'react-native';
import CHeader from '../components/views/CHeader'
import Geolocation from '@react-native-community/geolocation';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import MapView, { PROVIDER_GOOGLE, Marker,Callout } from 'react-native-maps';
import FirebaseSimpleService from '../Firebase/FirebaseSimpleService'
import FirebaseGetService from '../Firebase/FirebaseGetService'
import Ionicons from 'react-native-vector-icons/Ionicons';



let initialRegion = {
  latitude: 35.9025,
  longitude: 25.90902,
  latitudeDelta:42.02683,
  longitudeDelta:44.5742,
};


export default class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: [],
      isUserOnlineAndMapCoords: []
    };
  }

  goToBackPage() {
    this.props.navigation.goBack()
  }

  componentDidMount = async () => {
    const MapUsers = await FirebaseGetService.getUserAllCoordsAndIsOnline()
    const map = Object.keys(MapUsers)
    this.setState({ count: map })
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

  deneme() {
    return this.state.count.map((item, index) => {

      if(this.state.isUserOnlineAndMapCoords != ""){
        if(this.state.isUserOnlineAndMapCoords[item].isOnline){
      let Coords = {
        latitude: this.state.isUserOnlineAndMapCoords[item].latitude,
        longitude: this.state.isUserOnlineAndMapCoords[item].longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
        
        return (<Marker coordinate={Coords}
        image = {require('../res/images/personicon.png')}>
        <Callout
        onPress={() => console.log("callout hello")}>
          <View style= {{alignItems: 'center',}}>
           <Text>İsim Soyisim</Text>
           <Text style = {{color:"red"}}>Profili Gör</Text>
          </View>
        </Callout>
        </Marker>     
        )}}
      return (
        null
      )
    })
    
  }

  /* setMarker = () => {
     const coordDolmabahce ={
       latitude: 0,
       longitude: 0,
       latitudeDelta: 0.01,
       longitudeDelta: 0.01,
     };
     return coordDolmabahce
   }*/


  render() {
    return (
      <View style={{ flex: 1 }}>

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
          {this.deneme()}
        </MapView>

      </View>
    );
  }
}
