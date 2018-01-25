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
import Api from '../../../api/api';
import Tool from '../../../components/tool';
import Storage from '../../../components/storage';
import Controller from '../../../base/controller';

export default class Register extends Controller {

    constructor(props) {
        super(props);
    }

    _goRegister = () => {
        const user_name = this.user_name || '';
        const tel       = this.tel || '';
        const email     = this.email || '';
        const psw       = this.psw || '';
        const repsw     = this.repsw || '';
        if (user_name.length === 0) {
            this.toast('请输入用户名');
            return;
        }
        if (tel.length === 0) {
            this.toast('请输入手机号码');
            return;
        }
        if (!Tool.istel(tel)) {
            this.toast('请输入正确手机号格式');
            return;
        }
        if (email.length === 0) {
            this.toast('请输入电子邮箱');
            return;
        }
        if (!Tool.isemail(email)) {
            this.toast('请输入正确的电子邮箱格式');
            return;
        }
        if (psw.length < 6 || psw.length > 20) {
            this.toast('密码为6-20位');
            return;
        }
        if (psw !== repsw) {
            this.toast('两次密码输入不一致');
            return;
        }
        this.loading();
        Api.post({
            api: 'register/',
            param: {
                username: user_name,
                password: psw,
                mobile: tel,
                email: email,
            }
        }, (json) => {
            if (json.code !== 0) {
                this.toast(json.message);
            }else {
                this.loading(false);
                Storage.set('login', {
                    username: user_name,
                    password: psw
                }, () => {
                    const {block} = this.props.navigation.state.params;
                    block && block(true);
                    this.pop();
                });
            }
        });
    };


    render() {
        return (
            <View style = {styles.view}>
                <ScrollView style = {{flex: 1}}>
                    <ModityInputItem style = {styles.input} key = {0} hint = {'请输入用户名'} onChangeText = {(text) => {this.user_name = text}}/>
                    <ModityInputItem style = {styles.input} key = {1} hint = {'请输入手机号'} onChangeText = {(text) => {this.tel = text}}/>
                    <ModityInputItem style = {styles.input} key = {2} hint = {'请输入邮件地址'} onChangeText = {(text) => {this.email = text}}/>
                    <ModityInputItem style = {styles.input} key = {3} hint = {'请输入密码'} ispasswrod = {true} onChangeText = {(text) => {this.psw = text}}/>
                    <ModityInputItem style = {styles.input} key = {4} hint = {'请再次输入密码'} ispasswrod = {true} onChangeText = {(text) => {this.repsw = text}}/>
                    <WHCButton key = {5} style = {styles.registerBtn}
                               text = {'提交'}
                               textColor = {'white'}
                               onClick = {this._goRegister}/>
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
    registerBtn: {
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
        height: 44,
        borderRadius: 3,
        backgroundColor: color.theme,
    },
});
