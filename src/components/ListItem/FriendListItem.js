import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';



export default class FriendsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            friendList: ''
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
            console.log('Friendlist :', friendList)
        } catch (e) {
            console.log(e)
        }
        return friendList
    }



    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Ionicons name={'person-circle-outline'} size={80} color={'black'} />
                        <Text style={{ fontSize: 15, color: "#FFFFFF", }}>Uid: {this.state.uid}</Text>
                        <Text style={styles.name}>Ömer Özçetin</Text>
                    </View>
                </View>
                {this.state.friendList != null ?
                    <View style={styles.body}>
                        <TouchableOpacity>
                            <View style={styles.box}>
                                <Ionicons name={'person-circle-outline'} size={40} color={'black'}
                                />
                                <Text style={styles.username}>{this.state.friendList.name} {this.state.friendList.lastName}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
