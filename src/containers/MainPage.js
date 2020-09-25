import React, { Component } from 'react';
import { View, Text, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import FirebaseSimpleService from '../Firebase/FirebaseSimpleService'
import FirebaseGetService from '../Firebase/FirebaseGetService'
import CHeader from '../components/views/CHeader'


export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id :'',
      message :'',
    };
  }

  componentDidMount() {
    FirebaseSimpleService.setOnlineMethod()
    this.serviceFetch()
  }

  serviceFetch = async () => {
    let userData = await FirebaseGetService.getIsUserRegistered()
    if (userData === null) {
      this.props.navigation.navigate('RegisterProfilePage')
    }
  }

  goToBackPage() {
    this.props.navigation.goBack()
  }

  handleId(text){
    this.setState({id:text})
  }
  handleText(text){
    this.setState({message:text})
  }

  sendMessage(){
    FirebaseSimpleService.setSendMessage(this.state.id,this.state.message)
  }

  navigation(){
    console.log("Navigate")
    this.props.navigation.navigate("AddFriend")
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <CHeader
          headerTitle='Main Page'
          backPage={() => this.goToBackPage()}
          navigatons= {() => this.navigation()} />

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <TextInput
          placeholder = "Mesaj Kime"
          onChangeText={(text) => this.handleId(text)}/>

          <TextInput
          placeholder = "Mesaj Deneme"
          onChangeText={(text) => this.handleText(text)}/>
          
          <Button
          title = "Mesajı Gönder"
          onPress = {() => this.sendMessage()} />


        </View>

      </View>

    );
  }
}
