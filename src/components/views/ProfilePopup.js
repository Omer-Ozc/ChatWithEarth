import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { color } from 'react-native-reanimated';

export default class ProfilePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
        };
    }

    closePopup() {
        this.setState({ isVisible: false })
        this.props.closePopup()
    }


    render() {
        console.log("uid", this.props.uid)
        return (
            <View>
                <Modal isVisible={this.state.isVisible}
                    animationIn="slideInUp"
                    animationOut="slideOutDown">
                    <View style={styles.Container}>
                        
                        <Image
                            style={styles.profilImage}
                            source={require('../../res/images/personicon.png')} />

                        <Text style={styles.text}>{this.props.name} {this.props.lastName}</Text>
                        <Text style={styles.text}>{this.props.age}</Text>
                        {this.props.showID === "on" ? null :
                            <TouchableOpacity
                                style={styles.sendMessageBtn}
                                onPress={() => { this.props.goToChatPage(this.props.uid, this.props.name, this.props.lastName) }}>
                                <Text style={{ color: "white" }}>Send A Message</Text>
                            </TouchableOpacity>
                        }

                        {this.props.showID === "on" ?
                            <TextInput
                                style={{top:"10%"}}
                                value={this.props.uid} />
                            : null}

                        <TouchableOpacity
                            style={styles.closeBtn}
                            onPress={() => this.closePopup()}>
                            <Text style={{ color: 'white' }}>Close</Text>
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
        borderRadius: 75,
        borderWidth: 5,
        borderColor: "#432577"
    },
    closeBtn: {
        backgroundColor: 'red',
        width: 75,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        top: 50
    },
    sendMessageBtn: {
        backgroundColor: '#432577',
        width: 150,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        top: 45
    },
    text: {
        fontFamily:"serif",
        color:'#432577',
        fontSize: 18,
        fontWeight: 'bold',
        top: 20
    },

    profilImage: {
        borderRadius: 60
    }
});