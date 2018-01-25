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
import WHCText from '../../../components/whc-text';
import Storage from '../../../components/storage';
import Api from '../../../api/api';
import account from '../../../api/account';
import Controller from '../../../base/controller';
import { connect } from 'react-redux';
import {did_login} from "../../../actions/login-action";

class Login extends Controller {

    static navigationOptions = (options) => {
        options.headerRight = (<WHCButton style = {styles.rightItem}
                                          text = {'注册'}
                                          textColor = {color.theme}
                                          onClick = {() => {
                                              const {gotoRegisterBlock = null} = options.navigation;
                                              gotoRegisterBlock && gotoRegisterBlock();
                                          }}/>);
        Controller.navigationOptions(options);
        return options;
    }

    constructor(props) {
        super(props);
        this.state = {
            login: {},
        };
        this.props.navigation.gotoRegisterBlock = this._gotoRegister;
    }

    /**
     * 注册状态回调
     */
    _registerStateBlock = (isok) => {
        if (isok) {
            Storage.value('login', (login) => {
                this._setlogin(login);
            });
        }
    };

    _goLogin = () => {
        const user_name = this.user_name || '';
        const psw       = this.psw || '';
        if (user_name.length === 0) {
            this.toast('请输入用户名');
            return;
        }
        if (psw.length < 6 || psw.length > 20) {
            this.toast('密码为6-20位');
            return;
        }
        this.loading();
        Api.post({
            api: 'login/',
            param: {
                username: user_name,
                password: psw
            }
        }, (json) => {
            if (json.code !== 0) {
                this.toast(json.message);
            }else {
                account.user_info = json;
                this.loading(false);
                Storage.set('login', {
                    username: user_name,
                    password: psw
                }, () => {
                    this.props.dispatch(did_login(json));
                    this.pop();
                });
            }
        });
    };

    _gotoForgetPsw = () => {
        this.push('Forget', {title: '忘记密码'});
    };

    _gotoRegister = () => {
        this.push('Register', {title: '注册', block: this._registerStateBlock});
    };

    _setlogin = (login) => {
        this.user_name = login.username;
        this.psw = login.password;
        this.setState((state) => {
            state.login = login;
            return state;
        });
    };

    render() {
        return (
            <View style = {styles.view}>
                <ScrollView style = {{flex: 1 , backgroundColor: 'white'}}>
                    <View key = {0} style = {styles.topView}>
                        <WHCText style = {styles.logoText}
                                 text = {'React'}
                                 textColor = {'white'}
                                 fontSize = {20}/>
                    </View>
                    <View key = {1} style = {styles.bottomView}>
                        <ModityInputItem style = {styles.input}
                                         hint = {'请输入用户名'}
                                         key = {5}
                                         value = {this.state.login.username || ''}
                                         onChangeText = {(text) => {this.user_name = text}}/>
                        <ModityInputItem style = {styles.input}
                                         hint = {'请输入密码'}
                                         key = {6}
                                         value = {this.state.login.password || ''}
                                         ispasswrod = {true}
                                         onChangeText = {(text) => {this.psw = text}}/>
                    </View>
                    <WHCButton style = {styles.loginBtn}
                               text = {'登录'}
                               key = {2}
                               textColor = {'white'}
                               onClick = {this._goLogin}/>
                    <View style = {styles.forgetView}
                          key = {3}>
                        <WHCButton style = {styles.forgetBtn}
                                   text = {'忘记密码'}
                                   textColor = {color.theme}
                                   onClick = {this._gotoForgetPsw}/>
                    </View>
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
    rightItem: {
        width: 60,
        height: 30,
    },
    topView: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        height: 70,
        width: 70,
        backgroundColor: color.theme,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomView: {
        marginTop: 0,
    },
    input: {
        height: 44,
    },
    loginBtn: {
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
        height: 44,
        borderRadius: 3,
        backgroundColor: color.theme,
    },
    forgetView: {
        alignItems: 'flex-end',
        padding: 20,
    },
    forgetBtn: {
        height: 30,
        width: 60,
    },
});


function select(store){
    return {};
}

export default connect(select)(Login);