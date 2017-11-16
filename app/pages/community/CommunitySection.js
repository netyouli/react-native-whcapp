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
} from 'react-native';

import * as font from '../../constants/WHCFont';

class CommunitySection extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {image, title, markImage, markTitle} = this.props;
        return (
            <View style = {styles.view}>
                <Image style = {styles.img} source = {image}/>
                <Text style = {styles.title}>{title}</Text>
                <Image style = {styles.img} source = {markImage}/>
                <Text style = {styles.markTitle}>{markTitle}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    img: {
        width: 20,
        height: 20,
    },
    title: {
        marginLeft: 15,
        fontSize: 14,
        color: font.themeBlack,
        flexGrow: 2,
    },
    markTitle: {
        marginLeft: 15,
        fontSize: 14,
        color: font.themeGary,
    },

});

export default CommunitySection;
