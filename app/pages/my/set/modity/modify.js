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
    Text,
    TouchableHighlight,
} from 'react-native';

import {ModifyType} from '../../../../constants/app-constant';
import ModityInputItem from './modity-input-item';
import * as color from '../../../../constants/color';
import tool from '../../../../components/tool';
import storage from '../../../../components/storage';
import account from '../../../../api/account';
import Api from '../../../../api/api';
import Controller from '../../../../base/controller';

class Modity extends Controller {

    constructor(props) {
        super(props);

        this._mobile = '';
        this._email = '';
        this._new_psw = '';
        this._current_psw = '';
        this._renew_psw = '';
    }

    _clickCommit = () => {
        let param = {username: account.user_info.username,};
        let api = '';
        const {type} = this.props.navigation.state.params;
        switch (type) {
            case ModifyType.mobile:
                if (this._mobile.length === 0 || !tool.istel(this._mobile)) {
                    this.toast('手机号格式不对');
                    return;
                }
                api = 'modify_mobile/';
                param.mobile = this._mobile;
                break;
            case ModifyType.email:
                if (this._email.length === 0 || !tool.isemail(this._email)) {
                    this.toast('邮件格式不对');
                    return;
                }
                api = 'modify_email/';
                param.email = this._email;
                break;
            case ModifyType.password:
                if (this._current_psw.length === 0) {
                    this.toast('当前密码不能为空');
                    return;
                }
                if (this._new_psw.length < 6 || this._new_psw.length > 20) {
                    this.toast('密码范围6-20字符');
                    return;
                }
                if (this._new_psw !== this._renew_psw) {
                    this.toast('两次新密码输入不一致');
                    return;
                }
                storage.value('login', (login) => {

                });
                api = 'modity_psw/';
                param.password = this._current_psw;
                param.newpassword = this._new_psw;
                break;
            default:
                this.toast('修改类型不存在');
                return;

        }
        this.loading();
        Api.post({
            api: api,
            param: param,
        }, (json) => {
            if (json.code === 0) {
                this.toast('修改成功');
                setTimeout(() => {
                    this.pop();
                }, 2000);
            }else {
                this.toast(json.message);
            }
        });
    }

    render() {
        const {params} = this.props.navigation.state;
        let input_items = [];
        switch (params.type) {
            case ModifyType.mobile: {
                input_items.push(<ModityInputItem hint = {'请输入新手机号'} onChangeText = {(text) => {this._mobile = text;}}/>);
                break;
            }
            case ModifyType.email: {
                input_items.push(<ModityInputItem hint = {'请输入新邮箱'} onChangeText = {(text) => {this._email = text;}}/>);
                break;
            }
            case ModifyType.password: {
                input_items.push(<ModityInputItem hint = {'请输入旧密码'} ispasswrod = {true} onChangeText = {(text) => {this._current_psw = text;}}/>);
                input_items.push(<ModityInputItem hint = {'请输入新密码'} ispasswrod = {true} onChangeText = {(text) => {this._new_psw = text;}}/>);
                input_items.push(<ModityInputItem hint = {'请重复输入新密码'} ispasswrod = {true} onChangeText = {(text) => {this._renew_psw = text;}}/>);
                break;
            }
        }
        return (
            <View style = {styles.view}>
                {input_items}
                <TouchableHighlight style = {styles.commit}
                    onPress = {this._clickCommit}>
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
        paddingTop: 20,
    },
    text: {
        color: 'white',
        textAlign: 'center',
    },
    commit: {
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: color.theme,
        height: 44,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Modity;
