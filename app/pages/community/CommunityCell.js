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
    Text,
    Image,
    TouchableHighlight,
} from 'react-native';

import * as font from '../../constants/WHCFont';

class CommunityCell extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {title, loveNum,image, time, organizeName} = this.props.item;
        const click = this.props.click;
        if (image != null) {
            return (
                <TouchableHighlight onPress = {click}>
                    <View style = {{flex: 1}}>
                        <View style = {styles.viewimage}>
                            <View style = {styles.view}>
                                <Text style = {styles.title}>{title}</Text>
                                <Text style = {styles.info}>{loveNum + '人喜欢 · ' + organizeName + ' · ' + time}</Text>
                            </View>
                            <Image style = {styles.img} source = {image}/>
                        </View>
                        <View style = {styles.bottomLine}/>
                    </View>
                </TouchableHighlight>
            );
        }
        return (
            <TouchableHighlight onPress = {click}>
                <View style = {{flex: 1}}>
                    <View style = {styles.view}>
                        <Text style = {styles.title}>{title}</Text>
                        <Text style = {styles.info}>{loveNum + '人喜欢 · ' + organizeName + ' · ' + time}</Text>
                    </View>
                    <View style = {styles.bottomLine}/>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    viewimage: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    view: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 14,
        color: font.themeBlack,
    },
    info: {
        marginTop: 15,
        color: 'gray',
        fontSize: 12,
    },
    bottomLine: {
        backgroundColor: '#f1f1f1',
        height: 0.5,
    },
    img: {
        marginTop: 20,
        marginRight: 20,
        width: 50,
        height: 50,
    },
});

export default CommunityCell;
