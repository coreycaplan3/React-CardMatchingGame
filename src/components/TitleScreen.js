import React, {Component} from 'react';
import {AppRegistry, Text, StyleSheet, View} from 'react-native';
import {Card, Button} from 'react-native-material-design';
import {Navigation} from 'react-navigation';

export default class TitleScreen extends Component {

    static navigationOptions = {
        title: "Card Matching Game"
    };

    onStartNewGame() {
        const {navigate} = this.props.navigation;
        navigate('Game');
    }

    render() {
        return (
            <View>
                <Card>
                    <Card.Body>
                        <Text style={styles.title}>Welcome</Text>

                        <Button text="New Game" title="New Game" onPress={() => {this.onStartNewGame()}}/>
                    </Card.Body>
                </Card>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        color: 'blue',
        textAlign: 'center',
        margin: 16
    }
});

AppRegistry.registerComponent('TitleScreen', () => TitleScreen);