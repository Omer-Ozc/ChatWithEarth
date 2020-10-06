import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfilePopup from '../views/ProfilePopup'
import auth from '@react-native-firebase/auth';
import FirebaseGetService from '../../Firebase/FirebaseGetService'

let image;
let userImage = null
export default class CHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            images: "",
            userID: "",
            imagesUser:"",
        };
    }

    componentDidMount = async () => {
        const userId = auth().currentUser.uid;
        this.setState({ userID: userId })
        image = await FirebaseGetService.getUserImage(userId)
        this.setState({ images: image })
        {this.props.uid != null ? userImage = await FirebaseGetService.getUserImage(this.props.uid) : null }
        {userImage != null ? this.setState({imagesUser:userImage}) : null}
    }

    setPopup() {
        this.setState({ isShow: true })
        this.showPopup()
    }
    closePopup() {
        this.setState({ isShow: false })
    }
    setUserPopup() {
        this.setState({ isShow: true })
        this.showUserPopup()
    }

    showUserPopup() {
        if (this.state.isShow) {
            return (<ProfilePopup
                showUid ="off"
                uid={this.props.uid}
                name={this.props.name}
                lastName={this.props.lastName}
                closePopup={() => this.closePopup()} />)
        }
        else { return null }
    }

    showPopup() {
        if (this.state.isShow) {
            return (<ProfilePopup
                showID="on"
                uid={this.state.userID}
                name={this.props.name}
                lastName={this.props.lastName}
                age={this.props.age}
                closePopup={() => this.closePopup()} />)
        }
        else { return null }
    }



    signOut() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));

        this.props.goToLoginPage()
    }


    render() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.Container}>
                    {this.props.showGoBack != 'off' ?
                        <TouchableOpacity style={styles.touchableArrowStyle}
                            onPress={() => this.props.backPage()} >
                            <Ionicons name="arrow-back-outline" size={26} color="white" />
                        </TouchableOpacity>
                        : null}



                    {this.props.pageType === "ChatPage" ?
                        <View>
                            {this.showUserPopup()}
                            <TouchableOpacity style={styles.profileImage}
                                onPress={() => this.setUserPopup()} >
                                {this.props.userImage != null ?
                                    <Image
                                        source={{ uri: this.props.userImage }}
                                        style={{ width: 40, height: 40, borderRadius: 50 }} />
                                    :
                                    <Ionicons name={'person-circle-outline'} size={40} color={'white'} />}
                            </TouchableOpacity>
                        </View>
                        : null}

                    {this.props.headerTitle === "Chats" ?
                        <View>
                            {this.showPopup()}
                            <TouchableOpacity style={styles.profileImage}
                                onPress={() => this.setPopup()} >
                                {this.state.images != null ?
                                    <Image
                                        source={{ uri: this.state.images }}
                                        style={{ width: 40, height: 40, borderRadius: 50 }} />
                                    :
                                    <Ionicons name={'person-circle-outline'} size={40} color={'white'} />}
                            </TouchableOpacity>
                        </View>
                        : null}



                    {this.props.showMap == "on" ?
                        <TouchableOpacity
                            style={styles.touchableMap}
                            onPress={() => this.props.navigatonsToMap()}>
                            <MaterialCommunityIcons name={'google-maps'} size={35} color={'white'} />
                        </TouchableOpacity>
                        : null}


                    <Text style={styles.textStyle}> {this.props.headerTitle ? this.props.headerTitle : 'CHeader'} </Text>

                    {this.props.showPlus != "off" ?
                        <TouchableOpacity
                            style={styles.touchableStyle}
                            onPress={() => this.props.navigatons()}>
                            <AntDesign name={'plus'} size={26} color={'white'} />
                        </TouchableOpacity>
                        : null}

                    {this.props.showExit === "on" ?
                        <TouchableOpacity
                            style={{ left: 20 }}
                            onPress={() => this.signOut()}>
                            <Ionicons name={'exit-outline'} size={30} color={'white'} />
                        </TouchableOpacity>
                        : null}

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#432577",
        height: "6%",
        flexDirection: 'row',
        alignItems: 'center',
    },
    Container: {
        flexDirection: 'row',
        alignItems: 'center',

    },

    textStyle: {
        color: 'white',
        fontSize: 17,
        left: 20,
    },

    touchableArrowStyle: {
        left: 5
    },

    touchableStyle: {
        position: 'absolute',
        left: 380,
    },

    touchableMap: {
        position: 'absolute',
        left: 340,
    },

    profileImage: {
        left: 15
    }
});