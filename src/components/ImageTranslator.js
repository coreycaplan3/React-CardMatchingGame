import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

export default class ImageTranslator extends Component {

    static MAX_NUMBER = 12;

    static getImage(number) {
        if(typeof number !== 'number') {
            console.log("Error, invalid value");
            return null;
        } else if (number < 0 || number >= 12) {
            console.log(`Number must be between 0 and 11, found ${number}`);
            return null;
        } else {
            switch (number) {
                case 0:
                    // return '../images/c.png';
                    return 'https://www.programiz.com/sites/tutorial2program/files/c-logo.png';
                case 1:
                    // return '../images/c_sharp.png';
                    return 'https://cdn.codementor.io/assets/tutors/c-sharp-tutors-online.png';
                case 2:
                    // return '../images/cpp.png';
                    return 'https://ignite.apache.org/images/cpp.png';
                case 3:
                    // return '../images/java.png';
                    return 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png';
                case 4:
                    // return '../images/react.png';
                    return 'https://raw.githubusercontent.com/react-chunky/react-chunky/master/logo.png';
                case 5:
                    // return '../images/kotlin.png';
                    return 'https://d21ii91i3y6o6h.cloudfront.net/gallery_images/from_proof/14939/small/1472226645/kotlin-logo.png';
                case 6:
                    // return '../images/objective_c.png';
                    return 'https://images.contentful.com/7clmb9ye18e7/6LpZ8WIScMKQsAi0EoosMy/253f0d9b2f13a1b48d2a35632e86487f/Objective-c-logo.png';
                case 7:
                    // return '../images/php.png';
                    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1200px-PHP-logo.svg.png';
                case 8:
                    // return '../images/python.png';
                    return 'https://www.python.org/static/opengraph-icon-200x200.png';
                case 9:
                    // return '../images/scala.png';
                    return 'https://www.scala-lang.org/resources/img/smooth-spiral.png';
                case 10:
                    // return '../images/sql.png';
                    return 'https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Oracle_SQL_Developer_logo.svg/902px-Oracle_SQL_Developer_logo.svg.png';
                case 11:
                    // return '../images/swift.png';
                    return 'https://developer.apple.com/swift/images/swift-og.png';
            }
        }
    }
}

AppRegistry.registerComponent('ImageTranslator', ImageTranslator);