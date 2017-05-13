import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

import TitleScreen from './src/components/TitleScreen'
import GameScreen from './src/components/GameScreen'

import {
    StackNavigator,
} from 'react-navigation';

const CardMatchingGame = StackNavigator({
    Main: {screen: TitleScreen},
    Game: {screen: GameScreen},
});

AppRegistry.registerComponent('CardMatchingGame', () => CardMatchingGame);