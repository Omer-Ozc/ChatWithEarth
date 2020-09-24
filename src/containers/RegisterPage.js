import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import logo from '../res/images/earthLogo.jpg'
import auth from '@react-native-firebase/auth';


const { width: WIDTH } = Dimensions.get('window')

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      email: '',
      password: '',
      verifyPassword: '',
    };
  }


  handleMail(text) {
    this.setState({ email: text })
  }
  handlePassword(text) {
    this.setState({ password: text })
  }
  handleVerifyPassword(text) {
    this.setState({ verifyPassword: text })
  }

  btnSignUp = () => {
    if (this.state.password === this.state.verifyPassword) {
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log('User account created & signed in!');
          this.props.navigation.navigate('MainPage')
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  }

  render() {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
        <View syle={styles.logoContainer}>
          <Image source={logo} style={styles.logo} resizeMode='contain' />
          <Text style={styles.logoText}>Chat With Earth</Text>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name={'ios-person-outline'} size={28} color={'black'}
            style={styles.inputIcon}
          />

          <TextInput
            style={styles.input}
            placeholder={'Your Email'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            onChangeText={(text) => this.handleMail(text)}

          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name={'ios-lock-closed-outline'} size={28}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={this.state.showPass}
            placeholder={'Your Password'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            onChangeText={(text) => this.handlePassword(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name={'ios-lock-closed-outline'} size={28}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={this.state.showPass}
            placeholder={'Verify Your Password'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            onChangeText={(text) => this.handleVerifyPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.btnLogin}
          onPress={() => this.btnSignUp()}
        >
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  logoText: {
    color: '#432577',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 5,
    opacity: 0.8
  },
  inputContainer: {
    marginTop: 10
  },

  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25
  },

  inputIcon: {
    position: 'absolute',
    top: 6,
    left: 37
  },

  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#432577',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },

});
