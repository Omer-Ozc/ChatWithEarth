import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import CHeader from '../components/views/CHeader'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FirebaseSimpleService from '../Firebase/FirebaseSimpleService'
import MessageListItem from '../components/ListItem/MessageListItem'
import FirebaseGetService from '../Firebase/FirebaseGetService'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { FlatList } from 'react-native-gesture-handler';


export default class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatWith: this.props.route.params,
      Header: '',
      message: '',
      chat: [],
      ChatsLogs: [],
      ChatFromWho: [],
      Chats: [],
    };
  }

  componentDidMount = async () => {
    let Header = this.state.chatWith.name + " " + this.state.chatWith.lastName
    this.setState({ Header: Header })
    let messageObject = await FirebaseGetService.getUserAllChat(this.state.chatWith.uid)
    this.setState({ chat: messageObject })
    const array = Object.keys(this.state.chat);
    const array2 = Object.values(this.state.chat);
    this.setState({ ChatFromWho: array })
    this.setState({ Chats: array2 })

    console.log(this.state.ChatFromWho)
    console.log(this.state.Chats)



    for (let i = 0; i < array2.length; i++) {
      this.state.ChatsLogs.push({
        [array[i]]: array2[i]
      })
    }

    console.log("Chat Logs ", this.state.ChatsLogs)
    this.state.ChatsLogs.map((data, index) => {
      console.log(array[index])
      console.log(array2[index])
    })

  }

  goToBackPage() {
    this.props.navigation.goBack()
  }

  sendMessage() {
    FirebaseSimpleService.setSendMessage(this.state.chatWith.uid, this.state.message)
    const empty = ""
    this.setState({ message: empty })
  }

  createMessageContent(item, index) {
    const searchTerm = 'fromMe';
    const indexOfFirst = this.state.ChatFromWho[index].indexOf(searchTerm);
    console.log("İNDEX OF ", indexOfFirst)

    return (
        <MessageListItem
          checkChatSide={indexOfFirst != -1 ? "fromMe" : null}
          message={item} />
    )
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
            <FlatList
              inverted
              data={this.state.Chats}
              renderItem={({ item, index }) => this.createMessageContent(item, index)}
            />
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
