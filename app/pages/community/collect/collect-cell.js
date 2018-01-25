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
    View,
    StyleSheet,
    Image,
    Text,
    TouchableHighlight,
} from 'react-native';

import WHCLine from '../../../components/whc-line';
import Api from '../../../api/api';

CollectCell = ({
    item,
    onClick,
}) => {
    return (
        [
            <View style = {styles.view}>
                <TouchableHighlight onPress = {() => {
                    if (onClick !== void 0) {
                        onClick(item);
                    }
                }} underlayColor = {'transparent'}>
                    <View style = {styles.content_view}>
                        <Image style = {styles.image}
                                source = {{uri: Api.main_url + item.logoUrl}}/>
                        <View style = {styles.mid_content}>
                            <Text style = {styles.title}>{item.title}</Text>
                            <Text style = {styles.detail}>{item.count + '篇 · ' + item.focusCount + '关注 · ' + item.author}</Text>
                        </View>
                        <Image style = {styles.arrow_img} source = {require('../../../images/right_arrow_icon.png')}/>
                    </View>
                </TouchableHighlight>
            </View>,
            <WHCLine/>
        ]
    );
};


const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
    },
    content_view: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 3,
    },
    mid_content: {
        paddingLeft: 20,
        flexGrow: 2,
        height: 60,
        justifyContent: 'space-between',
    },
    arrow_img: {
        width: 20,
        height: 20,
    }
});

export default CollectCell;
