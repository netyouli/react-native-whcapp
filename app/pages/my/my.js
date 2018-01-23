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
    ScrollView,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import MyHeader from './my-header';
import WHCLine from '../../components/whc-line';
import MyItem from './my-item';
import Api from '../../api/api';
import Storage from '../../components/storage';
import Tool from '../../components/tool';
import account from '../../api/account';
import {CollectType} from '../../constants/app-constant';
import Controller from '../../base/controller';
import {did_login} from "../../actions/login-action";

class My extends Controller {

    constructor(props) {
        super(props);
        this.userInfo = {};
    }

    componentDidMount() {
        this._autoLogin();

    }

    shouldComponentUpdate(nextProps, nextState) {
        this.userInfo = nextProps.userInfo;
        return true;
    }

    _clickItem = (view, param) => {
        if (view) {
            if (account.did_login) {
                this.push(view, param);
            }else {
                this.push('Login', {title: '登录'});
            }
        }
    }

    _startRequest = () => {
        if (!account.did_login) {
            this._autoLogin();
        }
    }

    _autoLogin = () => {
        Storage.value('login', (login) => {
            if (login && Tool.count(login) === 2) {
                this.loading();
                Api.post({
                    api: 'login/',
                    param: login,
                }, (json) => {
                    account.user_info = json;
                    this.props.dispatch(did_login(json));
                    this.loading(false);
                });
            }
        });
    }

    render() {
        const {userInfo}  = this;
        const {lovenum = null, collectnum = null, readnum = null} = userInfo;
        const love_num    = lovenum ? lovenum + '篇' : '';
        const collect_num = collectnum ? collectnum + '个' : '';
        const read_num    = readnum ? readnum + '篇' : '';

        return (
            <View style = {styles.view}>
                <ScrollView style = {styles.scrollView}>
                    <MyHeader style = {styles.header}
                              info = {userInfo}
                              click = {() => {
                                  this._clickItem('User', {title: '个人信息', user_info: userInfo});
                              }}/>
                    <WHCLine/>
                    <View style = {styles.section1}>
                        <MyItem img = {require('../../images/my_love_icon.png')}
                                title = {'我喜欢的'}
                                value = {love_num}
                                click = {() => {
                                    this._clickItem('MyLike', {title: '我喜欢的'});
                                }}
                        />
                        <MyItem img = {require('../../images/my_collect_icon.png')}
                                title = {'我的收藏集'}
                                value = {collect_num}
                                click = {() => {
                                    this._clickItem('Collect', {title: '我的收藏集', type: CollectType.my_collect});
                                }}
                        />
                        <MyItem img = {require('../../images/my_read_icon.png')}
                                title = {'阅读过的文章'}
                                value = {read_num}
                                click = {() => {
                                    this._clickItem('DidRead', {title: '阅读过的文章'});
                                }}
                        />
                    </View>

                    <View style = {styles.section2}>
                        <MyItem img = {require('../../images/my_suggest_icon.png')}
                                title = {'意见反馈'}
                                click = {() => {
                                    this._clickItem('Feedback', {title: '意见反馈'});
                                }}
                        />
                        <MyItem img = {require('../../images/my_set_icon.png')}
                                title = {'设置'}
                                click = {() => {
                                    this._clickItem('Set', {title: '设置', user_info: userInfo});
                                }}
                        />
                    </View>
                </ScrollView>
                {super.render()}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#F4F6F9',
        paddingTop: 15,
        paddingBottom: 15,
    },
    header: {
        flex: 1,
    },
    section1: {
        marginTop: 15,
        backgroundColor: 'white',
    },
    section2: {
        marginTop: 15,
        backgroundColor: 'white',
    },
});

function select(store){
    return {
        isLogin: store.loginState.isLogin,
        userInfo: store.loginState.userInfo,
    }
}


export default connect(select)(My);

