import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Dimensions, Image, TouchableOpacity } from 'react-native';
import FirebaseSimpleService from '../Firebase/FirebaseSimpleService'
import ImagePicker from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';

const { width: WIDTH } = Dimensions.get('window')

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class RegisterProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            age: '',
            userAvatar: null,
            path: ""
        };
    }


    uploadToFirebase = async (path) => {
        await FirebaseSimpleService.setImage(path)
    }


    imagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = response;
                const urli = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    userAvatar: urli,
                    path: source.path
                });
                this.uploadToFirebase(source.path)
            }

        });

    }

    handleName(text) {
        this.setState({ name: text })
        console.log(this.state.name)
    }
    handleLastName(text) {
        this.setState({ lastName: text })
        console.log(this.state.lastName)

    }
    handleAge(text) {
        this.setState({ age: text })
        console.log(this.state.age)

    }

    btnPush = async () => {
        if(this.state.name == "" || this.state.lastName == "" || this.state.age == ""){
            Toast.show('Fill the empty blank');
        }
        if(this.state.userAvatar == null){
            Toast.show('Upload your profile photo');
        }
        else{
        await FirebaseSimpleService.setRegisterMethod(this.state.name, this.state.lastName, this.state.age)
        await FirebaseSimpleService.setRegisterMethodForOnlineUsers(this.state.name, this.state.lastName, this.state.age)
        this.props.navigation.navigate("MainPage")}
    }

    render() {
        return (
            <View style={styles.Container}>

                <View syle={styles.logoContainer}>
                    {this.state.userAvatar != null ?
                        <TouchableOpacity
                        onPress= {() => this.imagePicker()}>
                        <Image
                            style={styles.profilImage}
                            resizeMethod='auto'
                            source={this.state.userAvatar} />
                        </TouchableOpacity>

                        :
                        <TouchableOpacity
                        style = {styles.uploadPhotBtn}
                        onPress= {() => this.imagePicker()}>
                            <MaterialIcons name = "add-a-photo" size ={50} color = {"black"} />
                        </TouchableOpacity>
                    }
                </View>


                <TextInput
                    style={styles.input}
                    placeholder={'Your Name'}
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    onChangeText={(text) => this.handleName(text)}

                />
                <TextInput
                    style={styles.input}
                    placeholder={'Your Last Name'}
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    onChangeText={(text) => this.handleLastName(text)}

                />
                <TextInput
                    style={styles.input}
                    placeholder={'Your Age'}
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    onChangeText={(text) => this.handleAge(text)}

                />

                <TouchableOpacity
                style = {styles.btnLogin}
                onPress={() => this.btnPush()}>
                    <Text style = {{color:"white"}}>Sign In</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

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

    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    logo: {
        width: 150,
        height: 150,
    },

    logoText: {
        color: '#432577',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 5,
        opacity: 0.8
    },

    profilImage: {
        marginBottom: 40,
        borderRadius: 60,
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: "#432577"
    },

    btnLogin: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 170,
        height: 45,
        marginEnd: 10,
        marginStart: 10,
        borderRadius: 25,
        backgroundColor: '#432577',
        justifyContent: 'center',
        marginTop: 10,
    },

    uploadPhotBtn:{
        marginBottom: 40,
        justifyContent:'center',
        alignItems:'center',
        width:200,
        height:200,
        borderWidth: 2,
        borderColor: "#432577",
        borderRadius: 60,

    }

});
