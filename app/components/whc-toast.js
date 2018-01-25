/**
 *
 * Copyright 2017-present whcapp
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 * https://github.com/netyouli/whcapp
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React , {Component} from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Easing,
    Modal,
    Text,
} from 'react-native';

export default class WHCToast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
        };
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    _setOpacity = (value) => {
        this.setState((state) => {
            state.opacity.setValue(value);
            return state;
        });
    };

    _startAnimation = () => {
        this.did_end_show = false;
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 200,
            easing: Easing.out(Easing.linear),
        }).start(() => {
            const {duration} = this.props;
            this.timer = setTimeout(() => {
                this._setOpacity(1);
                Animated.timing(this.state.opacity, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.out(Easing.linear),
                }).start(() => {
                    this._setOpacity(0);
                    const {onHide = null} = this.props;
                    if (onHide) {
                        onHide && onHide();
                    }else {
                        this.modal.visible = false;
                    }
                });
            }, duration || 2500);
        });
    };

    render() {
        const {message = null} = this.props;
        let visible = message !== null && message !== '';
        visible && this._startAnimation();
        return (
            <Modal
                ref = {(ref) => {this.modal = ref}}
                transparent = {true}
                visible = {visible}>
                <View style = {styles.toast}>
                    <Animated.View style = {[styles.message, {opacity: this.state.opacity,}]}>
                        <Text style = {styles.text}>
                            {message}
                        </Text>
                    </Animated.View>
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    toast: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#000000B2',
        borderRadius: 5,
    },
    text: {
        color: 'white',
        fontSize: 14,
    },
});
