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
    Image,
    Text,
    Switch,
    TouchableHighlight,
} from 'react-native';

import PropTypes from 'prop-types';
import WHCLine from '../../components/WHCLine';
import * as font from '../../constants/WHCFont';

const propTypes = {
    click: PropTypes.func,
    img: PropTypes.object,
    title: PropTypes.string,
    value: PropTypes.string,
    isSwitch: PropTypes.bool,
};

const MyItem = ({img, title, value, click,isSwitch}) => {
    return (
        <TouchableHighlight onPress = {click} underlayColor = {'transparent'}>
            <View>
                <View style = {styles.item}>
                    <Image style = {styles.markImg} source = {img}/>
                    <Text style = {styles.titleText}>{title}</Text>
                    {isSwitch ? <Switch/> : <Text style = {styles.valueText}>{value}</Text>}
                </View>
                <WHCLine/>
            </View>
        </TouchableHighlight>
    );
}

MyItem.prototype = propTypes;

MyItem.defaultProps = {
    click() {},
    title: '',
    value: '',
    isSwitch: false,
    img: require('../../images/home_normal_icon.png')
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    markImg: {
        width: 20,
        height: 20,
    },
    titleText: {
        marginLeft: 20,
        flexGrow: 1,
        fontSize: 17,
        color: font.themeBlack,
    },
    valueText: {
        fontSize: 14,
        color: 'gray',
    },
});

export default MyItem;
