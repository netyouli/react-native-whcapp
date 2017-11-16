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

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
} from 'react-native';

import * as font from '../../constants/WHCFont';

class MyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const click = this.props.click;
        return (
            <TouchableHighlight onPress = {click}>
                <View style = {styles.header}>
                    <Image style = {styles.userImg} source = {require('../../images/tmp_user_icon3.png')}/>
                    <View style = {styles.userNameView}>
                        <Text style = {styles.titleText} numberOfLines = {1}>{'吴海超'}</Text>
                        <Text style = {styles.detailText} numberOfLines = {1}>{'www.wuhaichao.com'}</Text>
                    </View>
                    <Image style = {styles.arrowImg} source = {require('../../images/right_arrow_icon.png')}/>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'white',

    },
    userImg: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    userNameView: {
        marginLeft: 15,
        flexDirection: 'column',
        flexGrow: 1,
        height: 50,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: font.themeBlack,
        flexGrow: 1,
    },
    detailText: {
        fontSize: 14,
        color: 'gray',
    },
    arrowImg: {
        width: 18,
        height: 18,
        marginLeft: 15,
    },
});

export default MyHeader;
