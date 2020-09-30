import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { color } from 'react-native-reanimated';


export default class ProfilePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible:true
        };
    }


    closePopup(){
        this.setState({isVisible:false})
        this.props.closePopup()
    }

    render() {
        return (
            <View>
                <Modal isVisible={this.state.isVisible}
                animationIn = "slideInUp"
                animationOut = "slideOutDown">
                    <View style={styles.Container}>
                        <Image
                        style={styles.profilImage}
                        source={require('../../res/images/personicon.png')}
                        />
                        <Text style = {styles.text}>NAME LASTNAME</Text>
                        <Text style = {styles.text}>AGE</Text>
                        <TouchableOpacity
                        style = {styles.sendMessageBtn}
                        onPress= {() => {}}>
                            <Text style = {{color:"white"}}>Send A Message</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={styles.closeBtn}
                        onPress= {() => this.closePopup()}>
                            <Text style = {{color:'white'}}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        borderRadius:75,
        borderWidth:5,
        borderColor:"#432577"
    },
    closeBtn:{
        backgroundColor:'red',
        width:75,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        top:55
    },
    sendMessageBtn:{
        backgroundColor:'#432577',
        width:150,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        top:45
    },
    text:{
        fontSize:18,
        fontWeight:'bold',
        top:20
    },

    profilImage: {
        borderRadius:60
    }
});