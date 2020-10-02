import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import FirebaseGetSerivce from '../../Firebase/FirebaseGetService'

export default class FriendListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            friendList: [],
            fireBaseFriendLists: [],
            control: true,

        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.fireBaseFriendLists !== this.state.fireBaseFriendLists) {
            const userId = auth().currentUser.uid;
            let messageList = []
            const onValueChange = database()
                .ref(`/Users/${userId}/messages/`)
                .on('value', snapshot => {
                    messageList = snapshot.val()
                    if (messageList != this.state.fireBaseFriendLists) {
                        this.setState({ fireBaseFriendLists: messageList })
                    }
                });
            return false
        }
        return true
    }

    componentDidMount = async () => {
        const userId = auth().currentUser.uid;
        this.setState({ uid: userId })
        const friendList = await this.getData()
        { friendList != null ? this.setState({ friendList: friendList }) : null }
        let messageList = await FirebaseGetSerivce.getUserAllMessageList()
        this.setState({ fireBaseFriendLists: messageList })
        this.sortList()
    }


    sortList() {
        const array = Object.keys(this.state.fireBaseFriendLists)
        return array.map((data, index) => {
            this.setState({ control: true })
            if (this.state.friendList != null) {
                for (let i = 0; i < this.state.friendList.length; i++) {
                    if (this.state.friendList[i].uid == data) {
                        this.setState({ control: false })
                    }
                }
            }
            if (this.state.control) {
                const FriendObject = {
                    uid: data,
                    name: "Nameless Person",
                    lastName: "",
                }
                this.state.friendList.push(FriendObject)
            }
            this.storeData(this.state.friendList)
        })
    }

    storeData = async (value) => {
        try {
            const userId = auth().currentUser.uid;
            const jsonValue = JSON.stringify(value)
            console.log(jsonValue)
            await AsyncStorage.setItem(`@${userId}`, jsonValue)
        } catch (e) {
            console.log(e)
        }
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
        return friendList
    }

    buildFriendList() {
        return (
            this.state.friendList.map((data, index) => {
                return (
                    <View style={{ backgroundColor: 'white', height: "28%", }}>
                        <TouchableOpacity
                            style={{ borderBottomColor: '#432577', borderBottomWidth: 1 }}
                            onPress={() => this.props.ChatPage(data.uid, data.name, data.lastName)}>
                            <View style={{ top: "2%", marginStart: "1%" }}>
                                <Ionicons name={'person-circle-outline'} size={60} color={'black'} />
                            </View>
                            <Text style={{ fontFamily: 'serif', fontWeight: 'bold', top: "15%", left: "17%", fontSize: 20, position: 'absolute', color: "#432577" }}>{data.name} {data.lastName}</Text>
                            <Text style={{ top: "55%", left: "17.2%", fontSize: 12, position: 'absolute' }}>Son mesaj ön izlemesi eklenecek </Text>
                        </TouchableOpacity>
                    </View>
                )
            })
        )
    }

    noFriend() {
        console.log("style")
        return (<View style={{ alignItems: 'center', top: "50%" }}>
            <Text style={{ color: 'black', fontSize: 20, fontFamily: 'serif', fontWeight: 'bold' }}>You have not any chat</Text>
            <Text style={{ color: 'black', fontSize: 20, fontFamily: 'serif', fontWeight: 'bold' }}>You can send a message from here!</Text>
            <TouchableOpacity
                onPress={() => this.props.navigateToAddFriend()}>
                <View>
                    <MaterialCommunityIcons name={'chat-plus'} size={60} color={'#432577'} style={{ top: "20%" }} />
                </View>
            </TouchableOpacity>
            <Text style={{ color: 'black', fontSize: 20, fontFamily: 'serif', fontWeight: 'bold', top: "10%" }}>You can talk with earth!</Text>
            <TouchableOpacity
                onPress={() => this.props.navigateToMap()}>
                <View>
                    <Ionicons name={'earth'} size={60} color={'#432577'}  style = {{top:"50%"}} />
                </View>
            </TouchableOpacity>
            <Text style={{ color: 'black', fontSize: 20, fontFamily: 'serif', fontWeight: 'bold', top: "13%" }}>Press Me!</Text>
        </View>)
    }

    render() {

        return (
            <View style={styles.container}>
                {this.state.friendList != "" ?
                    this.buildFriendList()
                    : this.noFriend()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#20B2AA",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },

    container: {
    },

    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#FFFFFF",
        marginBottom: 10,
    },
    image: {
        width: 60,
        height: 60,
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        width: 500,
        height: 300,

        padding: 30,
        backgroundColor: "#E6E6FA",
    },
    box: {
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 1,
            width: -2
        },
        elevation: 2
    },
    username: {
        color: "#20B2AA",
        fontSize: 22,
        alignSelf: 'center',
        marginLeft: 10
    },

    userMessage: {
        color: "#20B2AA",
        fontSize: 15,
        alignSelf: 'center',
        marginLeft: 10,
        alignItems: 'center'
    }
});


/*<View style={{ marginStart: 4, marginEnd: 4}}>
                        <TouchableOpacity
                            onPress={() => this.props.ChatPage(data.uid, data.name, data.lastName)}>
                            <View style={styles.box}>
                                <Ionicons name={'person-circle-outline'} size={40} color={'black'} />
                                <Text style={styles.username}>{data.name} {data.lastName}</Text>
                            </View>
                            <View>
                            <Text style={styles.userMessage}>{data.name} {data.lastName}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>*/