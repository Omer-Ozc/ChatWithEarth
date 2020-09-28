import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default class CHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.Container}>
                    <TouchableOpacity style={styles.touchableArrowStyle}
                        onPress={() => this.props.backPage()} >
                        <Ionicons name={'arrow-back-outline'} size={26} color={'white'} />
                    </TouchableOpacity>

                    <Text style={styles.textStyle}> {this.props.headerTitle ? this.props.headerTitle : 'CHeader'} </Text>
                    {this.props.showPlus !="off" ? 
                    <TouchableOpacity
                        style={styles.touchableStyle}
                        onPress={() => this.props.navigatons()}>
                        <AntDesign name={'plus'} size={26} color={'white'} />
                    </TouchableOpacity>
                    : null }

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#432577",
        height: "6%",
        flexDirection: 'row',
        alignItems: 'center',
    },
    Container: {
        flexDirection: 'row',
        alignItems: 'center',

    },

    textStyle: {
        color: 'white',
        fontSize: 17,
        left: 30,
    },

    touchableArrowStyle: {
        left: 5
    },

    touchableStyle: {
        position: 'absolute',
        left: 380,
    },
});