import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

export default class CardMatchingGame extends Component {

    render() {
        return (
            <View>
              <Text>Hello World</Text>
            </View>
        );
    }

}

AppRegistry.registerComponent('CardMatchingGame', () => CardMatchingGame);