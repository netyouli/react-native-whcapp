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
    TouchableHighlight,
    TextInput,
    Text,
} from 'react-native';

import * as color from '../../../constants/color';
import api from '../../../api/api';
import Controller from '../../../base/controller';

class Feedback extends Controller {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            message: null
        };
        this._feedback = '';
    }

    _clickCommit = () => {
        if (this._feedback.length < 10) {
            this.toast('请最少输入10个字符');
            return;
        }
        this.loading();
        api.post({
            api: 'feedback/',
            param: {content: this._feedback},
        }, (json) => {
            this.toast(json.message);
        });

    };

    render() {
        return (
            <View style = {styles.view}>
                <TextInput style = {styles.input}
                    placeholder = {'请输入您的宝贵建议'}
                    underlineColorAndroid ='transparent'
                    onChangeText = {(text) => {this._feedback = text;}}
                    multiline = {true}/>
                    <TouchableHighlight style = {styles.commit}
                        onPress = {this._clickCommit}
                        underlayColor = {'transparent'}>
                        <Text style = {styles.text}>提 交</Text>
                    </TouchableHighlight>
                {super.render()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 100,
        backgroundColor: 'white',
    },
    text: {
        color: 'white',
        textAlign: 'center',
    },
    commit: {
        marginTop: 50,
        backgroundColor: color.theme,
        height: 44,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Feedback;
