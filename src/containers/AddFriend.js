import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Button } from 'react-native';
import CHeader from '../components/views/CHeader'
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

const { width: WIDTH } = Dimensions.get('window')

export default class AddFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            name: '',
            lastName: '',
            friendList :[]
        };
    }

    componentDidMount = async() =>{
        let friendList = await this.getData()
        {friendList !=null ? this.setState({friendList:friendList}) : null}

    }

    addFriendToObject (){
        const FriendObject = {
            uid: this.state.uid,
            name: this.state.name,
            lastName: this.state.lastName,
        }
        this.state.friendList.push(FriendObject)
        this.storeData(this.state.friendList)
        console.log("Friendlist State : ", this.state.friendList)
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
            await AsyncStorage.removeItem(`@${userId}`)
        } catch (e) {
            console.log(e)
        }
        console.log('Done.')
    }




    goToBackPage() {
        this.props.navigation.goBack()
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



    render() {
        return (
            <View style={{ flex: 1 }}>
                <CHeader
                    backPage={() => this.goToBackPage()} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        style={styles.input}
                        placeholder="User Uid"
                        onChangeText={(text) => this.handleId(text)} />
                    <TextInput
                        style={styles.input}
                        placeholder="Your Friend's Name"
                        onChangeText={(text) => this.handleName(text)} />
                    <TextInput
                        style={styles.input}
                        placeholder="Your Friend's Last Name"
                        onChangeText={(text) => this.handleLastName(text)} />
                    <Button
                        title="Add Friend"
                        onPress={() => this.addFriendToObject()} />
                    <Button
                        title="Delete All Friend"
                        onPress={() => this.removeValue()} />
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


});