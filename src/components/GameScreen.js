import React, {Component} from 'react';
import {AppRegistry, ScrollView, View, Text, StyleSheet} from 'react-native';
import CardTile from "./CardTile";
import CardModel from "./CardModel";

export default class GameScreen extends Component {

    static navigationOptions = {
        title: "Game"
    };

    tileList: [CardTile] = [];

    constructor() {
        super();

        this.state = {
            currentTime: 180,
            score: 0,
        };

        this.setupTiles();

        const intervalId = setInterval(() => {
            this.setState({
                currentTime: this.state.currentTime - 1
            });

            if (this.state.currentTime === 0) {
                clearInterval(intervalId);
            }
        }, 1000);
    }

    onFlipped(cardNumber, isFlipped) {
    }

    setupTiles() {
        const numberList = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11];

        const numberOfSwaps = 1000;
        for (let i = 0; i < numberOfSwaps; i++) {
            const first = parseInt(Math.random() * numberList.length);
            const second = parseInt(Math.random() * numberList.length);

            if (first !== second) {
                const temp = numberList[first];
                numberList[first] = numberList[second];
                numberList[second] = temp;
            }
        }

        let cardModelList: [CardModel] = [];
        numberList.forEach((number) => {
            cardModelList.push(new CardModel(number));
        });

        this.tileList = cardModelList.map((modelItem, index) => {
            return (
                <CardTile key={index} img={modelItem.image} cardModel={modelItem} onFlipFunction={this.onFlipped}/>
            );
        });
    }

    render() {
        return (
            <View>
                <View style={styles.topContainer}>
                    <View style={styles.bannerContainer}>
                        <Text style={styles.banner}>
                            Timer: {this.state.currentTime}
                        </Text>
                    </View>
                    <View style={styles.spacer}/>
                    <View style={styles.bannerContainer}>
                        <Text style={styles.banner}>
                            Score: {this.state.score}
                        </Text>
                    </View>
                </View>
                <ScrollView horizontal={false}>
                    <View style={styles.cardContainer}>
                        {this.tileList}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topContainer: {
        padding: 8,
        backgroundColor: '#CCC',
        flexDirection: 'row',
    },
    bannerContainer: {
        height: 36,
        alignContent: 'center',
        justifyContent: 'center',
    },
    banner: {
        color: 'black',
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignItems: 'baseline',
    },
    spacer: {
        margin: 8
    },
});

AppRegistry.registerComponent('GameScreen', GameScreen);