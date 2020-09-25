import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Button } from 'react-native';
import CHeader from '../components/views/CHeader'

const { width: WIDTH } = Dimensions.get('window')

export default class AddFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    addFriendToStorage() {

    }

    goToBackPage() {
        this.props.navigation.goBack()
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <CHeader
                    backPage={() => this.goToBackPage()} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        style={styles.input}
                        placeholder="User Uid"
                        onChangeText={(text) => this.handleId(text)} />
                    <TextInput
                        style={styles.input}
                        placeholder="Your Friend's Name"
                        onChangeText={(text) => this.handleId(text)} />
                    <TextInput
                        style={styles.input}
                        placeholder="Your Friend's Last Name"
                        onChangeText={(text) => this.handleId(text)} />
                    <Button
                        title="Add"
                        onPress={() => this.addFriendToStorage()} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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


});
