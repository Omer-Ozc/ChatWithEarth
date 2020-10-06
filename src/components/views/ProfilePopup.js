import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { color } from 'react-native-reanimated';
import ImagePicker from 'react-native-image-picker';
import FirebaseSimpleService from '../../Firebase/FirebaseSimpleService'
import FirebaseGetService from '../../Firebase/FirebaseGetService'



const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


export default class ProfilePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
            avatarSource: "",
            firebaseAvatar: "",
        };
    }

    componentDidMount() {
        this.getImageToFirebase(this.props.uid)
    }


    closePopup() {
        this.setState({ isVisible: false })
        this.props.closePopup()
    }

    uploadToFirebase = async (path) => {
        await FirebaseSimpleService.setImage(path)
        this.props.closePopup()
    }

    getImageToFirebase = async (uid) => {

        if (uid != null) {
            let url = await FirebaseGetService.getUserImage(uid)
            this.setState({ firebaseAvatar: url })
        }
    }


    imagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = response;

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                //console.log("Source", source.path)

                this.setState({
                    avatarSource: source.data,
                    path: source.path
                });
                this.uploadToFirebase(source.path)
            }

        });

    }



    render() {
        return (
            <View>
                <Modal isVisible={this.state.isVisible}
                    animationIn="slideInUp"
                    animationOut="slideOutDown">
                    <View style={styles.Container}>
                        {this.state.firebaseAvatar != null ?
                            <Image
                                style={styles.profilImage}
                                resizeMethod='resize'
                                source={{
                                    uri: this.state.firebaseAvatar,
                                }} />
                            :
                            <Image
                                style={styles.profilImage}
                                resizeMethod='resize'
                                source={{
                                    uri: 'data:image/jpeg;base64,' + this.state.avatarSource,
                                }} />
                        }

                        {this.props.showID === "on" ?
                            <TouchableOpacity
                                onPress={() => this.imagePicker()}>
                                <Text
                                    style={{ color: "red" }}>Upload Photo</Text>
                            </TouchableOpacity>
                            : null}

                        <Text style={styles.text}>{this.props.name} {this.props.lastName}</Text>
                        <Text style={styles.text}>{this.props.age}</Text>
                        {this.props.showID === "on" || this.props.showUid ==="off" ? null :
                            <TouchableOpacity
                                style={styles.sendMessageBtn}
                                onPress={() => { this.props.goToChatPage(this.props.uid, this.props.name, this.props.lastName) }}>
                                <Text style={{ color: "white" }}>Send A Message</Text>
                            </TouchableOpacity>
                        }

                        {this.props.showID === "on" ?
                            <TextInput
                                style={{ top: "10%", color: "red" }}
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
        fontFamily: "serif",
        color: '#432577',
        fontSize: 18,
        fontWeight: 'bold',
        top: 20
    },

    profilImage: {
        borderRadius: 60,
        width: 100,
        height: 100,
        borderWidth:2,
        borderColor:"#432577"
    }
});