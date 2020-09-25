import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Dimensions, Image } from 'react-native';
import FirebaseSimpleService from '../Firebase/FirebaseSimpleService'
import logo from '../res/images/earthLogo.jpg'



const { width: WIDTH } = Dimensions.get('window')

export default class RegisterProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            age: '',
        };
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

    btnPush = () => {
        FirebaseSimpleService.setRegisterMethod(this.state.name, this.state.lastName, this.state.age)
    }

    render() {
        return (
            <View style={styles.Container}>

                <View syle={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} resizeMode='contain' />
                    <Text style={styles.logoText}>Chat With Earth</Text>
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

                <Button
                    title='Push'
                    onPress={() => this.btnPush()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
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
});
