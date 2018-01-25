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

import { connect } from 'react-redux';
import SetItem from './set-item';
import WHCLine from '../../../components/whc-line';
import {ModifyType} from '../../../constants/app-constant';
import * as color from '../../../constants/color';
import WHCButton from '../../../components/whc-button';
import account from '../../../api/account';
import Controller from '../../../base/controller';
import {did_logout} from '../../../actions/login-action';

class Set extends Controller {

    constructor(props) {
        super(props);
    }

    _gotoModityUI = (title, type) => {
        this.push('Modify', {title: title, type: type});
    };

    _exitLogin = () => {
        account.exit_login();
        this.props.dispatch(did_logout());
        this.pop();
    };

    render() {
        const {user_info} = this.props.navigation.state.params;
        return (
            <View style = {styles.v}>
                <ScrollView>
                    <SetItem title = {'邮箱'}
                        value = {user_info.email}
                        onClick = {() => {
                            this._gotoModityUI('修改邮箱', ModifyType.email);
                        }}/>
                    <WHCLine/>
                    <SetItem title = {'手机号'}
                         value = {user_info.mobile}
                         onClick = {() => {
                             this._gotoModityUI('修改手机号', ModifyType.mobile);
                         }}/>
                    <WHCLine/>
                    <SetItem title = {'修改账户密码'}
                             onClick = {() => {
                                 this._gotoModityUI('修改密码', ModifyType.password);
                             }}/>
                    <WHCLine/>
                    <WHCButton style = {styles.exit}
                               text = {'退出登录'}
                               textColor = {'white'}
                               onClick = {this._exitLogin}/>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    v: {
        flex: 1,
    },
    exit: {
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
        height: 44,
        borderRadius: 3,
        backgroundColor: color.theme,
    },
});

function select(store){
    return {};
}


export default connect(select)(Set);

