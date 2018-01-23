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

import React from 'react';
import {
    StyleSheet,
    View,
    Animated, Easing,
} from 'react-native';

import * as color from '../../constants/color';
import Controller from '../../base/controller';

export default class Launch extends Controller {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            scale: new Animated.Value(1),
            opacity: new Animated.Value(1),
        };
    }

    componentDidMount() {
        const duration = 1500;
        Animated.parallel([
            Animated.timing(this.state.scale, {
                toValue: 2,
                duration: duration,
                easing: Easing.out(Easing.ease),
            }),
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: duration,
                easing: Easing.out(Easing.ease),
            })
        ]).start(() => {
            this.setRootController('Tabbar');
        });

    }


    render() {
        const {scale, opacity} = this.state;
        return (
            <View style = {styles.view}>
                <Animated.Image style = {
                    {
                        flex: 1,
                        backgroundColor: color.theme,
                        opacity: opacity,
                        transform: [
                            {
                                scale: scale.interpolate({
                                    inputRange: [1, 2],
                                    outputRange: [1, 2.5],
                                })
                            }
                        ],
                    }
                }
                                source = {require('../../images/launch.png')}
                                resizeMode = 'contain'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.theme,
    },
});

