'use strict';
import React, {Component, PropTypes} from 'react';
import {Animated, TouchableWithoutFeedback, View, Easing, StyleSheet} from "react-native";

class FlipView extends Component {

    static propTypes = {
        style: View.propTypes.style,
        flipDuration: PropTypes.number,
        flipEasing: PropTypes.func,
        flipAxis: PropTypes.oneOf(['x', 'y']),
        front: PropTypes.object,
        back: PropTypes.object,
        perspective: PropTypes.number,
        onFlip: PropTypes.func,
        onFlipped: PropTypes.func,
        isFlipped: PropTypes.bool,
    };

    static defaultProps = {
        style: {},
        flipDuration: 500,
        flipEasing: Easing.out(Easing.ease),
        flipAxis: 'y',
        perspective: 1000,
        onFlip: () => {
        },
        onFlipped: () => {
        },
        isFlipped: false,
    };

    constructor(props) {
        super(props);

        let targetRenderState = this._getTargetRenderStateFromFlippedValue(props.isFlipped);

        let frontRotationAnimatedValue = new Animated.Value(targetRenderState.frontRotation);
        let backRotationAnimatedValue = new Animated.Value(targetRenderState.backRotation);

        let interpolationConfig = {inputRange: [0, 1], outputRange: ["0deg", "360deg"]};
        let frontRotation = frontRotationAnimatedValue.interpolate(interpolationConfig);
        let backRotation = backRotationAnimatedValue.interpolate(interpolationConfig);

        this.state = {
            frontRotationAnimatedValue,
            backRotationAnimatedValue,
            frontRotation,
            backRotation,
            isFlipped: props.isFlipped,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isFlipped !== this.props.isFlipped) {
            this.flip();
        }
    };

    _getTargetRenderStateFromFlippedValue = (isFlipped) => {
        return {
            frontRotation: isFlipped ? 0.5 : 0,
            backRotation: isFlipped ? 1 : 0.5
        };
    };


    render() {
        let rotateProperty = this.props.flipAxis === 'y' ? 'rotateY' : 'rotateX';

        return (
            <TouchableWithoutFeedback onPress={() => {
                this.flip();
            }}>
                <View {...this.props}>
                    <Animated.View
                        pointerEvents={this.state.isFlipped ? 'none' : 'auto'}
                        style={[styles.flippableView, {transform: [{perspective: this.props.perspective}, {[rotateProperty]: this.state.frontRotation}]}]}>
                        {this.props.front}
                    </Animated.View>
                    <Animated.View
                        pointerEvents={this.state.isFlipped ? 'auto' : 'none'}
                        style={[styles.flippableView, {transform: [{perspective: this.props.perspective}, {[rotateProperty]: this.state.backRotation}]}]}>
                        {this.props.back}
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    flip() {
        this.props.onFlip();

        let nextIsFlipped = !this.state.isFlipped;

        let {frontRotation, backRotation} = this._getTargetRenderStateFromFlippedValue(nextIsFlipped);

        Animated.parallel(
            [
                this._animateValue(this.state.frontRotationAnimatedValue, frontRotation, this.props.flipEasing),
                this._animateValue(this.state.backRotationAnimatedValue, backRotation, this.props.flipEasing)
            ]
        ).start(k => {
            if (!k.finished) {
                return;
            }
            this.setState({isFlipped: nextIsFlipped});
            this.props.onFlipped(nextIsFlipped);
        });
    };

    _animateValue = (animatedValue, toValue, easing) => {
        return Animated.timing(
            animatedValue,
            {
                toValue: toValue,
                duration: this.props.flipDuration,
                easing: easing
            }
        );
    };
}

let styles = StyleSheet.create({
    flippableView: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backfaceVisibility: 'hidden',
    }
});

module.exports = FlipView;