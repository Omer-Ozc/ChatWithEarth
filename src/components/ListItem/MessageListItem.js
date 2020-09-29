import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

export default class MessageListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <View>
        {this.props.message != null ?
          <View style={this.props.checkChatSide === "fromMe" ? styles.ContainerRight : styles.ContainerLeft}>
            <Text style={styles.TextStyleLeft}>{this.props.message}</Text>
          </View>
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  ContainerLeft: {
    backgroundColor: 'gray',
    alignSelf: 'flex-start',
    marginBottom: 10,
    borderBottomEndRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    left: "1%",
    top: "10%",
  },

  ContainerRight: {
    backgroundColor: 'rgba(67,37,119, 1)',
    alignSelf: 'flex-end',
    marginBottom: 10,
    borderTopRightRadius: 15,
    borderTopStartRadius: 15,
    borderBottomLeftRadius: 15,
    top: "10%",
    right: "1%"

  },

  TextStyleLeft: {
    fontSize: 17,
    margin: 10,
    color: 'white',

  },

  TextStyleRight: {
    fontSize: 17,
    margin: 10,
    color: 'white'
  }
});
