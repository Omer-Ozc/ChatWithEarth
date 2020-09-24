import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native';
import GoogleLog from '../components/LoginButtons/GoogleLog'
import FacebookLog from '../components/LoginButtons/FacebookLog'

const {width: WIDTH} = Dimensions.get('window')

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onFinish = (data) => {
    console.log(data)
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View syle={styles.logoContainer}>
          <Image source={styles.logo} style ={styles.logo}/>
          <Text style = {styles.logoText}>Chat With Earth</Text>
        </View>

      <View>
        <TextInput
        style = {styles.input}
        placeholder={'Emailiniz'}
        placeholderTextColor = {null}
        underlineColorAndroid="black"
        />
      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
  },

  logoContainer: {
    alignItems: 'center'
  },

  logoText:{
    color: 'white',
    fontSize:20,
    fontWeight:'500',
    marginTop:10,
    opacity:0.5
  },

  input :{
    width:WIDTH -55,
    height:25,
    borderRadius:25,
    fontSize:16,
    paddingLeft:45,
    backgroundColor : 'rgba(0,0,0,0.35)',
    color : 'rgba(255,255,255,0.7)',
    marginHorizontal:25
  }
});
