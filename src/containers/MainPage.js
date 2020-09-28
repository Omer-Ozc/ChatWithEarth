import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import database from '@react-native-firebase/database';
import FirebaseSimpleService from '../Firebase/FirebaseSimpleService'
import FirebaseGetService from '../Firebase/FirebaseGetService'
import CHeader from '../components/views/CHeader'
import AsyncStorage from '@react-native-community/async-storage';
import FriendListItem from '../components/ListItem/FriendListItem'




export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      message: '',
      profileObject :'',
    };
  }

  componentDidMount() {
    FirebaseSimpleService.setOnlineMethod()
    this.serviceFetch()
    this.getData()
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
    console.log("Navigate")
    this.props.navigation.navigate("AddFriend")
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


  render() {
    return (
      <View style={{ flex: 1 }}>

        <CHeader
          headerTitle='Main Page'
          backPage={() => this.goToBackPage()}
          navigatons={() => this.navigation()} />

        <View>

          <FriendListItem
          name = {this.state.profileObject.name}
          lastName = {this.state.profileObject.lastName} />

        </View>

      </View>

    );
  }
}


/*<TextInput
          placeholder = "Mesaj Kime"
          onChangeText={(text) => this.handleId(text)}/>

          <TextInput
          placeholder = "Mesaj Deneme"
          onChangeText={(text) => this.handleText(text)}/>

          <Button
          title = "Mesajı Gönder"
          onPress = {() => this.sendMessage()} />*/

/*
handleId(text){
this.setState({id:text})
}
handleText(text){
this.setState({message:text})
}

sendMessage(){
FirebaseSimpleService.setSendMessage(this.state.id,this.state.message)
}
*/