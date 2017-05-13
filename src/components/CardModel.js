import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import ImageTranslator from './ImageTranslator'

export default class CardModel extends Component {

    number: number;
    isFlipped: boolean;
    image: string;

    constructor(number) {
        super();
        this.number = number;
        this.isFlipped = false;
        this.image = ImageTranslator.getImage(number);
    }

    isEqual(other: CardModel) {
        return this.isFlipped && other.isFlipped && this.number === other.number;
    }

}

AppRegistry.registerComponent('CardModel', CardModel);