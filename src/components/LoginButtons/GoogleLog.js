import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { statusCodes, GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

let status = false

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
            //hostedDomain: '', // specifies a hosted domain restriction
            //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            //accountName: '', // [Android] specifies an account name on the device that should be used
            //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
    }

    /*signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };*/


    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo });
            console.log(userInfo)
            status=true
            console.log(status)
            this.props.onFinish(this.state.userInfo)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                let status = false
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                let status = false
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                let status = false
                // play services not available or outdated
            } else {
                let status = false
                // some other error happened
            }
        }
    };



    render() {
        return (
            <View style = {{marginTop:10}}>
                <GoogleSigninButton
                    style={{ width: 192, height: 35 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => {this._signIn()}}
                    disabled={this.state.isSigninInProgress}
                   // onFinish ={this.props.onFinish(status)}
                     />
               
            </View>
        );
    }
}

/* <Button
                title= "Gmail çıkış"
                onPress ={()=> this.signOut()} />*/
