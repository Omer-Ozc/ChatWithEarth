import React, { Component } from 'react';
import { View,Button,TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Login extends Component {

    async onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();
        if(data != null){
            this.props.onFinish()
        }

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }


    render() {


        return (
            <View>
                <TouchableOpacity
                onPress={() => this.onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
                >
                    <Ionicons name='logo-facebook' size = {30} color ={'blue'} />
                </TouchableOpacity>
            </View>
        );
    }
}