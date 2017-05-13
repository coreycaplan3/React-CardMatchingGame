import React, {Component} from 'react';
import {AppRegistry, Image, View, Text, StyleSheet, Animated} from 'react-native';
import CardModel from "./CardModel";
import TouchableItem from "react-navigation/lib-rn/views/TouchableItem";

export default class CardTile extends Component {

    onFlipFunction;
    cardModel: CardModel;

    constructor(props) {
        super(props);
        this.cardModel = this.props.cardModel;
        console.log("Card", this.cardModel);

        this.state = {
            image: this.cardModel.image,
            isFlipped: this.cardModel.isFlipped,
            value: 0
        };
        this.onFlipFunction = this.props.onFlipFunction;
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.animatedValue.addListener(({value}) => {
            this.setState({
                value: value
            })
        });

        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        });

        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        });
    }

    flipCard() {
        if (this.state.value >= 90) {
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }

    }

    render() {
        const frontAnimatedStyle = {
            transform: [
                {rotateY: this.frontInterpolate}
            ],
            display: this.state.value >= 90 ? 'none' : 'flex'
        };
        const backAnimatedStyle = {
            transform: [
                {rotateY: this.backInterpolate}
            ],
            display: this.state.value >= 90 ? 'flex' : 'none'
        };
        return (
            <TouchableItem style={styles.outerContainer} onPress={() => {
                this.flipCard();
            }}>
                <View style={styles.container}>
                    {/* Front Side of the Card */}
                    <Animated.View style={[frontAnimatedStyle, styles.frontCard]}>
                        <Text style={styles.question}>?</Text>
                    </Animated.View>

                    {/* Back Side of the Card */}
                    <Animated.View style={[backAnimatedStyle, styles.frontCard, styles.backCard]}>
                        <Image style={styles.image} source={{uri: this.state.image}} resizeMode={'stretch'}/>
                    </Animated.View>
                </View>
            </TouchableItem>
        );
    }

}

const styles = StyleSheet.create({
    outerContainer: {
        width: 75,
        height: 150,
        margin: 8,
        backgroundColor: '#bbdefb',
        borderColor: 'gray',
        borderWidth: 1,
    },
    container: {
        width: 75,
        height: 150,
    },
    frontCard: {
        position: 'absolute',
        top: 0,
        width: 75,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden'
    },
    backCard: {
        position: 'absolute',
        top: 0,
    },
    question: {
        fontSize: 37.5,
        width: 75,
        height: 75,
        textAlign: 'center',
        color: 'black',
    },
    image: {
        width: 56,
        height: 75,
    }
});

AppRegistry.registerComponent('CardTile', CardTile);