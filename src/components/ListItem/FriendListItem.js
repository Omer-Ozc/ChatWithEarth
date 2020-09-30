import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class FriendListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            friendList: []
        };
    }

    componentDidMount = async () => {
        const userId = auth().currentUser.uid;
        this.setState({ uid: userId })
        const friendlist = await this.getData()
        this.setState({ friendList: friendlist })

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
                        onPress = {() => this.props.ChatPage(data.uid, data.name, data.lastName)}>
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
                        onPress = {() => this.props.navigateMap()}>
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
