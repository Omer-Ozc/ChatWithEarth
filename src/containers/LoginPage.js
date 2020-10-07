import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import GoogleLog from '../components/LoginButtons/GoogleLog'
import FacebookLog from '../components/LoginButtons/FacebookLog'
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
      loading: true,
      user: null
    };
  }

  onFinish = (data) => {
    console.log(data)
  }

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true })
    }
    else {
      this.setState({ showPass: true, press: false })

    }
  }

  handleMail(text) {
    this.setState({ email: text })
  }
  handlePassword(text) {
    this.setState({ password: text })
  }

  btnSignIn = () => {
    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
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

  onAuthStateChanged(user) {
    this.setState({ user: user });
    if (this.state.initializing) {
      this.setState({ initializing: false })
    }
  }

  componentDidMount() {
    this.execAuth()
  }

  execAuth(){
    auth().onAuthStateChanged((user) => {
      this.setState({ loading: false, user });
    });
  }

  


  render() {

    if (this.state.loading) {return null;}
    if(this.state.user != null){
      this.props.navigation.navigate("MainPage")
    }

    
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
            style={styles.inputIcon} />

          <TextInput
            style={styles.input}
            secureTextEntry={this.state.showPass}
            placeholder={'Your Password'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            onChangeText={(text) => this.handlePassword(text)}
          />

          <TouchableOpacity style={styles.btnEye}
            onPress={this.showPass.bind(this)}>
            <Ionicons name={this.state.press == false ? 'ios-eye-outline' : 'ios-eye-off-outline'} size={26} color={'black'} />
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.btnLogin}
          onPress={() => this.btnSignIn()}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 15 }}>If you are not a member</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('RegisterPage')}
          >
            <Text style={{ color: '#432577', fontSize: 18, fontStyle: 'italic', fontWeight: 'bold' }}> Register</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <GoogleLog
            onFinish={() => this.props.navigation.navigate("MainPage")} />
          <FacebookLog
            onFinish={() => this.props.navigation.navigate("MainPage")} />
        </View>


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
