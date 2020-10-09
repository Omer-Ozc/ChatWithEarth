import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import CHeader from '../components/views/CHeader'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FirebaseSimpleService from '../Firebase/FirebaseSimpleService'
import MessageListItem from '../components/ListItem/MessageListItem'
import FirebaseGetService from '../Firebase/FirebaseGetService'
import { FlatList } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';



export default class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatWith: this.props.route.params,
      Header: '',
      message: '',
      chat: [],
      ChatFromWho: [],
      Chats: [],
    };
  }

  componentDidMount = async () => {
    let Header = this.state.chatWith.name + " " + this.state.chatWith.lastName
    this.setState({ Header: Header })

    let messageObject = await FirebaseGetService.getUserAllChat(this.state.chatWith.uid)
    this.setState({ chat: messageObject })

    {this.state.chat !=null ? this.sortAlgorithm() : null}


  }

  //////////// BURADAN TAŞINICAK//////////////
  shouldComponentUpdate(nextProps, nextState) {

     if (nextState.chat !== this.state.chat) {
      const userId = auth().currentUser.uid;
      let message = []
      const onValueChange = database()
        .ref(`/Users/${userId}/messages/${this.state.chatWith.uid}`)
        .on('value', snapshot => {
          message = snapshot.val()
          if (JSON.stringify(message) != JSON.stringify(this.state.chat)) {
            this.setState({ chat: message })
            this.sortAlgorithm()
          }
        });
      return false
    }
    return true
  }



  sortAlgorithm() {
    let swapped;
    const array = Object.keys(this.state.chat);
    const array2 = Object.values(this.state.chat);

    do {
      swapped = false
      for (let k = 0; k < array.length - 1; k++) {
        let firstDate = array[k]
        let secondDate = array[k + 1]
        firstDate = firstDate.substring(0, 25)
        secondDate = secondDate.substring(0, 25)
        let firstDateMs = Date.parse(firstDate);
        let secondDateMs = Date.parse(secondDate);
        if (firstDateMs < secondDateMs) {
          let tmp = array[k];
          array[k] = array[k + 1];
          array[k + 1] = tmp;
          swapped = true;
          let tmp2 = array2[k];
          array2[k] = array2[k + 1];
          array2[k + 1] = tmp2;
        }
      }
    } while (swapped);

    this.setState({ ChatFromWho: array })
    this.setState({ Chats: array2 })

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
    return (
      <MessageListItem
        checkChatSide={indexOfFirst != -1 ? "fromMe" : null}
        message={item} />
    )
  }

  noNameChat(){
    return(
      <View style = {{justifyContent:'center', alignItems:'center'}}>
      <Text style = {{fontSize:15}}>İf you want to Chat, you have to add your Friendlist</Text>
      <TouchableOpacity 
      style = {{backgroundColor:"#432577", width:150, height:50, justifyContent:'center', alignItems:'center', borderRadius:50}}
      onPress= {() => this.props.navigation.navigate("AddFriend",{
        uid : this.state.chatWith.uid
      })}>
        <Text style = {{color :"white"}}>Add Your Friendlist</Text>
      </TouchableOpacity>
      </View>
    )
  }

  render() {

    return (
      <View style={{ flex: 1, backgroundColor:'white'}}>

        <CHeader
          uid = {this.state.chatWith.uid}
          name = {this.state.chatWith.name}
          lastName = {this.state.chatWith.lastName}
          headerTitle={this.state.Header}
          backPage={() => this.goToBackPage()}
          userImage = {this.state.chatWith.userImage}
          showPlus="off"
          pageType="ChatPage" />

        <View style={styles.ChatContainer}>
          {this.state.Header != "Nameless Person " ? 
          <ScrollView
            ref={ref => { this.scrollView = ref }} onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>
            {this.state.chat !=null ?
            <FlatList
              inverted
              data={this.state.Chats}
              extraData={this.state.Chats}
              renderItem={({ item, index }) => this.createMessageContent(item, index)}
              keyExtractor={(item, index) => 'key' + index}
            /> : null }
          </ScrollView>
          : this.noNameChat()}
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


