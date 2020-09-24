import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { statusCodes, GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default class GoogleLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '988818025350-2lhmqgtnu61alglpl9t71jm3vs52q89v.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.

        });
    }

    async onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        if(idToken != null){
            this.props.onFinish()
        }
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      }


    render() {
        return (
            <View>
                <TouchableOpacity
                 onPress={() => this.onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                >
                    <MaterialCommunityIcons name='gmail' size = {35} color ={'red'} />
                </TouchableOpacity>

            </View>
        );
    }
}