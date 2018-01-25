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
    ScrollView,
} from 'react-native';

import WHCButton from '../../../components/whc-button';
import * as color from '../../../constants/color';
import ModityInputItem from '../set/modity/modity-input-item';
import tool from '../../../components/tool';
import api from '../../../api/api';
import Controller from '../../../base/controller';

export default class Forget extends Controller {

    constructor(props) {
        super(props);
        this._username = '';
        this._email = '';
    }

    _commit = () => {
        if (this._username.length === 0) {
            this.toast('用户名不能为空');
            return;
        }
        if (this._email.length === 0) {
            this.toast('邮件地址不能为空');
            return;
        }
        if (!tool.isemail(this._email)) {
            this.toast('请输入正确的邮件地址');
            return;
        }
        this.loading();
        api.post({
            api: 'forget_password/',
            param: {
                username: this._username,
                email: this._email
            }
        }, (json) => {
            if (json.code === 0) {
                this.toast('您的密码：' + json.password);
                setTimeout(() => {
                    this.pop();
                }, 2000);
            }else {
                this.toast(json.message);
            }
        });
    };


    render() {
        return (
            <View style = {styles.view}>
                <ScrollView style = {{flex: 1}}>
                    <ModityInputItem style = {styles.input} key = {0} hint = {'请输入用户名'} onChangeText = {(text) => {this._username = text;}}/>
                    <ModityInputItem style = {styles.input} key = {1} hint = {'请输入邮件地址'} onChangeText = {(text) => {this._email = text;}}/>
                    <WHCButton style = {styles.commitBtn}
                               text = {'提交'}
                               key = {3}
                               textColor = {'white'}
                               onClick = {this._commit}/>
                </ScrollView>
                {super.render()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    input: {
        height: 44,
    },
    commitBtn: {
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
        height: 44,
        borderRadius: 3,
        backgroundColor: color.theme,
    },
});
