import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FirebaseGetSerivce from '../../Firebase/FirebaseGetService'

export default class FriendListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            friendList: [],
            fireBaseFriendLists: [],
            control: true,
            counter: 0,
            images: []
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        let FirebaseNextStateObjectKeys = []
        if (nextState.fireBaseFriendLists != null) {
            FirebaseNextStateObjectKeys = Object.keys(nextState.fireBaseFriendLists)
        }
        let FirebaseStateObjectKeys = []
        if (this.state.fireBaseFriendLists) {
            let FirebaseStateObjectKeys = Object.keys(this.state.fireBaseFriendLists)
        }

        let StorageObjectKeys = []
        for (let i = 0; i < this.state.friendList.length; i++) {
            StorageObjectKeys[i] = this.state.friendList[i].uid
        }
        let NextStorageObjectKeys = []
        for (let i = 0; i < nextState.friendList.length; i++) {
            NextStorageObjectKeys[i] = nextState.friendList[i].uid
        }

        /* console.log("FirebaseNextStateObjectKeys : ", FirebaseNextStateObjectKeys)
         console.log("FirebaseStateObjectKeys : ", FirebaseStateObjectKeys)
         console.log("NextStorageObjectKeys : ", NextStorageObjectKeys)
         console.log("StorageObjectKeys : ", StorageObjectKeys)*/

        if (FirebaseNextStateObjectKeys === FirebaseStateObjectKeys) {
            //console.log("FirebaseNextStateObjectKeys === FirebaseStateObjectKeys")
            return false
        }
        if (StorageObjectKeys === NextStorageObjectKeys) {
            //console.log("StorageObjectKeys === NextStorageObjectKeys")
            return false
        }
        if (NextStorageObjectKeys !== FirebaseNextStateObjectKeys) {
            // console.log("NextStorageObjectKeys !== FirebaseNextStateObjectKeys")
            return true
        }

        return false
    }


    componentDidMount = async () => {
        const userId = auth().currentUser.uid;
        this.setState({ uid: userId })
        let friendList = await this.getData()
        { friendList != [] ? this.setState({ friendList: friendList }) : this.setState({ friendList: [] }) }
        this.fetchImages()
        let messageList = await FirebaseGetSerivce.getUserAllMessageList()
        this.setState({ fireBaseFriendLists: messageList })
        this.sortList()
    }

    componentDidUpdate = async (prevProps, prevState) => {
        let friendList = await this.getData()
        let messageList = await FirebaseGetSerivce.getUserAllMessageList()
        let FirebaseObj = []
        if (this.state.fireBaseFriendLists != null) {
            FirebaseObj = Object.keys(this.state.fireBaseFriendLists)

        }
        let friendListObj = []
        if (this.state.friendList != [] && this.state.friendList != null) {
            this.state.friendList.map((data, index) => {
                friendListObj[index] = data.uid
            })
        }
        let control = true

        if (JSON.stringify(friendList) !== JSON.stringify(this.state.friendList)) {
            //console.log("state friendlist karşılaştırması")
            { friendList != null ? this.setState({ friendList: friendList }) : this.setState({ friendList: [] }) }
            // console.log(this.state.friendList)
        }

        if (JSON.stringify(messageList) !== JSON.stringify(this.state.fireBaseFriendLists)) {
            //console.log("firebase friendlist karşılaştırması")
            this.setState({ fireBaseFriendLists: messageList })
        }

        if (friendListObj.length === FirebaseObj.length) {
            control = false
        }
        if (control) {
            this.sortList()
            this.fetchImages()
        }

    }



    sortList() {
        let control = true
        if (this.state.fireBaseFriendLists != null) {
            const array = Object.keys(this.state.fireBaseFriendLists)
            return array.map((data, index) => {
                if (control != true) {
                    control = true
                }

                if (this.state.friendList != null) {
                    for (let i = 0; i < this.state.friendList.length; i++) {
                        if (this.state.friendList[i].uid == data) {
                            control = false
                        }
                    }
                }
                if (control) {
                    const FriendObject = {
                        uid: data,
                        name: "Nameless Person",
                        lastName: "",
                    }
                    this.state.friendList.push(FriendObject)
                }
                //console.warn("STORDATA : ", this.state.friendList)
                this.storeData(this.state.friendList)
                this.fetchImages()
            })
        }

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
        let friendList = []
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

    fetchImages = async () => {
        console.log("fetch")
        let imageArray = []
        if (this.state.friendList != null && this.state.friendList != "") {

            for (let i = 0; i < this.state.friendList.length; i++) {
                imageArray[i] = await FirebaseGetSerivce.getUserImage(this.state.friendList[i].uid)
                //this.state.images.push(imageArray[i])
            }
            this.setState({ images: imageArray })
        }


        //this.setState({ images: imageArray })

    }

    buildFriendList() {
        //this.fetchImages()
        if (this.state.friendList != [] && this.state.friendList != null) {
            return (
                this.state.friendList.map((data, index) => {
                    let key = index

                    return (
                        <View style={{ backgroundColor: 'white' }}>
                            <TouchableOpacity
                                style={{ borderBottomColor: '#432577', borderBottomWidth: 1 }}
                                onPress={() => this.props.ChatPage(data.uid, data.name, data.lastName, this.state.images[index])}>
                                <View style={{ top: "2%", marginStart: "1%" }}>
                                    {this.state.images[index] != null ?
                                        <Image
                                            source={{ uri: this.state.images[index] }}
                                            style={{ width: 60, height: 60, borderRadius: 50, marginBottom: 4 }} />
                                        :
                                        <Ionicons name={'person-circle-outline'} size={60} color={'black'} />}
                                </View>
                                <Text style={{ fontFamily: 'serif', fontWeight: 'bold', top: "15%", left: "17%", fontSize: 20, position: 'absolute', color: "#432577" }}>{data.name} {data.lastName}</Text>
                                <Text style={{ top: "55%", left: "17.2%", fontSize: 12, position: 'absolute' }}>Son mesaj ön izlemesi eklenecek </Text>
                            </TouchableOpacity>
                        </View>
                    )
                })
            )
        }
    }

    noFriend() {
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
                    <Ionicons name={'earth'} size={60} color={'#432577'} style={{ top: "50%" }} />
                </View>
            </TouchableOpacity>

            <Text style={{ color: 'black', fontSize: 20, fontFamily: 'serif', fontWeight: 'bold', top: "13%" }}>Press Me!</Text>
        </View>)
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.friendList != null && this.state.friendList != "" ?
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



/*if(nextState.friendList !== this.state.friendList){
            return true
        }
        console.log("next state : ", nextState.fireBaseFriendLists)
        console.log("State : ", this.state.fireBaseFriendLists )
        console.log("next state Strogae : ", nextState.friendList)
        console.log("State Strogae : ", this.state.friendList )
        if (JSON.stringify(nextState.fireBaseFriendLists) !== JSON.stringify(this.state.fireBaseFriendLists)) {
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
        console.log("retrun true")
        this.sortList()

            return true}

        return false*/