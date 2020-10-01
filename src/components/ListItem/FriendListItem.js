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
            control: true
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
                    console.log("Bakıyoruz", this.state.friendList[i].uid)
                    console.log("Bakıyoruz DATA: ", data)

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
                    <View style={{ marginStart: 4, marginEnd: 4 }}>
                        <TouchableOpacity
                            onPress={() => this.props.ChatPage(data.uid, data.name, data.lastName)}>
                            <View style={styles.box}>
                                <Ionicons name={'person-circle-outline'} size={40} color={'black'} />
                                <Text style={styles.username}>{data.name} {data.lastName}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            })
        )
    }



    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Ionicons name={'person-circle-outline'} size={80} color={'black'} />
                        <Text style={styles.name}>{this.props.name} {this.props.lastName}</Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigateMap()}>
                            <MaterialCommunityIcons name={'google-maps'} size={35} color={'black'} />
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.friendList != null ?
                    this.buildFriendList()
                    : null}
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
    }
});
