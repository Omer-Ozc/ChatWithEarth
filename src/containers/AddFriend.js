import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Button, TouchableOpacity } from 'react-native';
import CHeader from '../components/views/CHeader'
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import FirebaseSimpleService from '../Firebase/FirebaseSimpleService'
import FirebaseGetService from '../Firebase/FirebaseGetService'

const { width: WIDTH } = Dimensions.get('window')

export default class AddFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            name: '',
            lastName: '',
            friendList: [],
            allUsers: []
        };
    }

    componentDidMount = async () => {
        let friendList = await this.getData()
        { friendList != null ? this.setState({ friendList: friendList }) : null }
        let users = await FirebaseGetService.getAllUsers()
        this.setState({ allUsers: users })
        let uids = this.props.route.params.uid
        let name = this.props.route.params.name
        let lastName = this.props.route.params.lastName
        this.setState({ uid: uids, name: name, lastName: lastName })
    }

    getData = async () => {
        let friendList = ''
        try {
            const userId = auth().currentUser.uid;
            const jsonValue = await AsyncStorage.getItem(`@${userId}`)
            friendList = JSON.parse(jsonValue)
        } catch (e) {
            console.log(e)
        }
        if (friendList == "") {
            return []
        }
        else {
            return friendList
        }
    }

    addFriendToObject() {
        let copyList = this.state.friendList
        let control = false
        let index = 0
        for (let i = 0; i < this.state.friendList.length; i++) {
            if (this.state.friendList[i].uid == this.state.uid) {
                control = true
                index = i
            }
        }
        if (control) {
            let checkList = []
            checkList[0] = {
                uid: this.state.uid,
                name: this.state.name,
                lastName: this.state.lastName,
               /* messages: {
                    message: copyList[index].messages.message
                }*/
            }
            copyList[index] = checkList[0]
            this.setState({ friendList: copyList })
            this.storeData(this.state.friendList)
        }
        else {
            console.log("ELSE ÇALIŞTI")
            const FriendObject = {
                uid: this.state.uid,
                name: this.state.name,
                lastName: this.state.lastName,
            }
            FirebaseSimpleService.addFriendToFirebase(this.state.uid)
            this.state.friendList.push(FriendObject)
            this.storeData(this.state.friendList)
        }
    }


    storeData = async (value) => {
        try {
            const userId = auth().currentUser.uid;
            const jsonValue = JSON.stringify(value)
            console.log(jsonValue)
            await AsyncStorage.setItem(`@${userId}`, jsonValue)
            this.props.navigation.navigate("MainPage")
        } catch (e) {
            console.log(e)
        }
    }

    removeValue = async () => {
        try {
            const userId = auth().currentUser.uid;
            const jsonValue = JSON.stringify("")
            await AsyncStorage.setItem(`@${userId}`, jsonValue)
        } catch (e) {
            console.log(e)
        }
        await FirebaseSimpleService.removeAllMessage()
        console.log('Done.')
        this.props.navigation.navigate("MainPage")


    }




    goToBackPage() {
        this.props.navigation.navigate("MainPage")
    }

    handleId(text) {
        this.setState({ uid: text })
    }
    handleName(text) {
        this.setState({ name: text })
    }
    handleLastName(text) {
        this.setState({ lastName: text })
    }

    getRandomUser() {
        const userId = auth().currentUser.uid;
        let users = Object.keys(this.state.allUsers)
        var RandomNumber = Math.floor(Math.random() * users.length);
        console.log("RandomUser : ", users[RandomNumber])
        if (userId !== users[RandomNumber]) {
            let uid = users[RandomNumber]
            let name = this.state.allUsers[users[RandomNumber]].name
            let lastName = this.state.allUsers[users[RandomNumber]].lastName
            this.setState({uid:uid, name:name , lastName:lastName})
        }
    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                <CHeader
                    headerTitle="Add Friend"
                    backPage={() => this.goToBackPage()}
                    showPlus="off" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        style={styles.input}
                        placeholder="User Uid"
                        onChangeText={(text) => this.handleId(text)}
                        value={this.state.uid} />
                    <TextInput
                        style={styles.input}
                        placeholder="Your Friend's Name"
                        onChangeText={(text) => this.handleName(text)}
                        value={this.state.name} />
                    <TextInput
                        style={styles.input}
                        placeholder="Your Friend's Last Name"
                        onChangeText={(text) => this.handleLastName(text)}
                        value={this.state.lastName} />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => this.addFriendToObject()}
                            style={styles.btnLogin}>
                            <Text style={{ color: "white" }}>Add Friend</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.removeValue()}
                            style={styles.btnLogin}>
                            <Text style={{ color: "white" }}>Delete All Friend</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.getRandomUser()}
                        style={styles.btnLogin}>
                        <Text style={{ color: "white" }}>Random User</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        marginBottom: 5
    },

    btnLogin: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 45,
        marginEnd: 10,
        marginStart: 10,
        borderRadius: 25,
        backgroundColor: '#432577',
        justifyContent: 'center',
        marginTop: 10,
    },


});