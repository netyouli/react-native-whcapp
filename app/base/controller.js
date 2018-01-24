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

import React, {Component} from 'react';
import {
    TouchableHighlight,
    Image,
    Platform,
    View,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import WHCToast from '../components/whc-toast';
import WHCLoading from '../components/whc-loading';

/**
 * 基类控制器
 */

export default class Controller extends Component {
    /**
     * 存储界面路由信息
     * @type {Map<any, any>}
     */
    static routerMap = new Map();

    /**
     * 路由名称数组
     * @type {Array}
     */
    static routerNames = [];


    static navigationOptions = (options) => {
        const {navigation = null, navigationOptions} = options;
        if (navigation) {
            const  {params = null} = navigation.state;
            const {headerLeft = null, headerRight = null} = navigationOptions;
            if (params) {
                const {title = null} = params;
                if (title) {
                    options.title = title;
                }
            }
            const {key = ''} = navigation.state;
            if (key.toLowerCase().indexOf('init') !== 0 && !headerLeft) {
                options.headerLeft = (
                    <TouchableHighlight style = {{
                        backgroundColor: 'transparent',
                        width: 70,
                        height: 40,
                        justifyContent: 'center',
                    }} onPress={() => {
                        const {goBackBlock = null} = navigation.state.params;
                        goBackBlock && goBackBlock();
                    }} underlayColor={'transparent'}>
                        <Image style = {{
                            width: 20,
                            height: 20,
                            marginLeft: 5,
                        }} source={require('../images/nav-back-icon.png')}/>
                    </TouchableHighlight>
                );
                if (!headerRight && Platform.OS === 'android') {
                    options.headerRight = (<View/>);
                }
            }
        }
        return options;
    };

    /**
     * 基类视图构造方法
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            loading: false,
        };
        if (this.props.navigation.state.params === void 0) {
            this.props.navigation.state.params = {};
        }
        this.props.navigation.state.params.goBackBlock = this.goBack;
    }


    /**
     * 是否可以返回
     * @returns {boolean}
     */
    canBack() {
        return true;
    }

    /**
     * pop返回回调
     */
    goBack = () => {
        if (this.canBack()) {
            this.pop();
        }
    };

    /**
     * push跳转新页面
     * @param name 路由名称
     * @param param 路由参数
     */
    push = (name = null, param = {}) => {
        const {routerMap, routerNames} = Controller;
        if (name) {
            const {navigation = null} = this.props;
            if (navigation) {
                const {state = null} = navigation;
                if (state) {
                    const {routeName = null, key = null} = state;
                    if (routeName && key) {
                        routerNames.push(routeName);
                        routerMap.set(routeName, key);
                    }
                }
            }
            const {navigate} = this.props.navigation;
            navigate(name, param);
        }else {
            console.error('push name not null');
        }
    };

    /**
     * 设置导航标题
     * @param title
     */
    setTitle = (title = null) => {
        if (title) {
            const {key = null} = this.props.navigation.state;
            if (key) {
                const setParam = NavigationActions.setParams({
                    key: key,
                    params: {
                        title: title,
                    }
                });
                this.props.navigation.dispatch(setParam);
            }
        }
    };

    /**
     * 设置根路由
     * @param name 路由名称
     */
    setRootController = (name = null) => {
        const {routerMap, routerNames} = Controller;
        if (name && name.length > 0) {
            const reset = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: name})]
            });
            routerMap.clear();
            routerNames.splice(0, routerNames.length);
            this.props.navigation.dispatch(reset);
        }else {
            console.warn('root constroller name not null');
        }
    };


    /**
     * pop返回指定name路由界面
     * @param name 路由名称
     */
    pop = (name = null) => {
        const {routerMap, routerNames} = Controller;
        const {goBack} = this.props.navigation;
        if (name) {
            let key = routerMap.get(name);
            if (key) {
                const routerLength = routerNames.length;
                const index = routerNames.indexOf(name);
                if (index + 1 < routerLength) {
                    let routerName = routerNames[index + 1];
                    key = routerMap.get(routerName);
                    if (!goBack(key)) {
                        this.setRootController(name);
                    }else {
                        routerMap.delete(name);
                        routerNames.splice(index,1);
                    }
                }else {
                    routerMap.delete(name);
                    routerNames.splice(index,1);
                    goBack();
                }
            }else {
                console.warn(`not found router ${name} for key`);
            }
        }else {
            const routerName = routerNames.pop();
            routerMap.delete(routerName);
            goBack();
        }
    };

    /**
     * toast 弹窗
     * @param message 要显示的消息
     * message = null 隐藏toast
     */
    toast = (message = null) => {
        this.setState((state) => {
            state.message = message;
            state.loading = false;
            return state;
        });
    };

    /**
     * 网络菊花加载
     * @param loading 是否加载 默认true加载 false 隐藏
     */
    loading = (loading = true) => {
        this.setState((state) => {
            state.loading = loading;
            state.message = null;
            return state;
        });
    };

    render() {
        const {message = null, loading = false} = this.state;
        return (
            [
                <WHCToast key = {1}
                          message = {message}
                          onHide = {() => {
                              this.toast();
                          }}/>,
                <WHCLoading key = {2} show = {loading}/>
            ]
        );
    }
}
