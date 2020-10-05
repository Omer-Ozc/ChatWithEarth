import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfilePopup from '../views/ProfilePopup'
import auth from '@react-native-firebase/auth';
import FirebaseGetService from '../../Firebase/FirebaseGetService'

const userId = auth().currentUser.uid;
let image; 
export default class CHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            images:""
        };
    }

    componentDidMount = async () =>{
        image = await FirebaseGetService.getUserImage(userId)
        this.setState({images:image})
    }

    setPopup() {
        this.setState({ isShow: true })
        this.showPopup()
    }
    closePopup() {
        this.setState({ isShow: false })
    }

    showPopup() {
        if (this.state.isShow) {
            return (<ProfilePopup
                showID = "on"
                uid={userId}
                name={this.props.name}
                lastName={this.props.lastName}
                age={this.props.age}
                closePopup={() => this.closePopup()} />)
        }
        else {return null}
    }

    render() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.Container}>
                    {this.props.showGoBack != 'off' ?
                        <TouchableOpacity style={styles.touchableArrowStyle}
                            onPress={() => this.props.backPage()} >
                            <Ionicons name = "arrow-back-outline" size = {26} color = "white"/>
                        </TouchableOpacity>
                        : null}
                    {this.showPopup()}
                    {this.props.pageType === "ChatPage" ?
                        <TouchableOpacity style={styles.profileImage}
                            onPress={() => Alert.alert("Profil Ekranına gidicek. (Daha oluşturulmadı.)")} >
                            <Ionicons name={'person-circle-outline'} size={40} color={'white'} />
                        </TouchableOpacity>
                        : null}

                    {this.props.headerTitle === "Chats" ?
                        <TouchableOpacity style={styles.profileImage}
                            onPress={() => this.setPopup()} >
                            {this.state.images != null ? 
                            <Image
                            source={{uri : this.state.images}}
                            style = {{width:40, height:40, borderRadius:50}}/>
                            :
                            <Ionicons name={'person-circle-outline'} size={40} color={'white'} />                        }
                        </TouchableOpacity>
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