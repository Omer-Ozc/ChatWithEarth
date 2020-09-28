import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import CHeader from '../components/views/CHeader'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FirebaseSimpleService from '../Firebase/FirebaseSimpleService'
import MessageListItem from '../components/ListItem/MessageListItem'
import FirebaseGetService from '../Firebase/FirebaseGetService'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


export default class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatWith: this.props.route.params,
      Header: '',
      message: '',
      chat: []
    };
  }

  componentDidMount = async () => {
    let Header = this.state.chatWith.name + " " + this.state.chatWith.lastName
    this.setState({ Header: Header })
    let messageObject = await FirebaseGetService.getUserAllChat(this.state.chatWith.uid)
    this.setState({chat : messageObject})
    console.log("Mesajlar :" ,this.state.chat)

  }

  goToBackPage() {
    this.props.navigation.goBack()
  }

  /*componentDidUpdate(prevProps, prevState) {
    if(prevState.chat != this.state.chat){
    const userId = auth().currentUser.uid;
    let messageObject = ""
    database()
      .ref(`/Users/${userId}/messages/${this.state.chatWith.uid}`)
      .on('value', snapshot => {
        console.log('User Get Message Chat Page: ', snapshot.val());
        messageObject = snapshot.val()
      });
    console.log("msaEr", messageObject)
    this.setState({chat:messageObject})
    console.log(this.state.chat)
  }
  }*/

  sendMessage() {
    FirebaseSimpleService.setSendMessage(this.state.chatWith.uid, this.state.message)
    const empty = ""
    this.setState({ message: empty })
  }

  render() {

    return (
      <View style={{ flex: 1 }}>

        <CHeader
          headerTitle={this.state.Header}
          backPage={() => this.goToBackPage()}
          showPlus="off" />

        <View style={styles.ChatContainer}>
          <ScrollView>
            <MessageListItem />
          </ScrollView>
        </View>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.TextInput}
            value={this.state.message}
            placeholder="Type your message"
            onChangeText={(text) => this.setState({ message: text })}
          />

          <TouchableOpacity style={styles.sendMessageIcon}
            onPress={() => { this.state.message != "" ? this.sendMessage() : null }}>
            <Ionicons name={'ios-send'} size={26} color={this.state.message != "" ? "green" : "gray"} />

          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  ChatContainer: {
    height: "88%",
  },

  sendMessageIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },

  textInputContainer: {
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "white"
  },

  TextInput: {
  }
});
