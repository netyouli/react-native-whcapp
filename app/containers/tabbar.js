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
import {TabNavigator} from 'react-navigation';
import {
    Image,
    Platform,
    View,
} from 'react-native';

import Home from '../pages/home/home';
import Community from '../pages/community/community';
import My from '../pages/my/my';

import * as color from '../constants/color';

export default Tabbar = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: '首页',
            headerLeft: (<View/>),
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor}) => {
                return(<Image
                    resizeMode = 'contain'
                    source = {require('../images/home_normal_icon.png')}
                    style = {{
                        width: 20,
                        height: 20,
                        tintColor: tintColor,
                    }}/>
            )},
        },
    },
    Community: {
        screen: Community,
        navigationOptions: {
            title: '社区',
            headerLeft: (<View/>),
            tabBarLabel: '社区',
            tabBarIcon: ({tintColor}) => {
                return (<Image
                    source = {require('../images/community_normal_icon.png')}
                    style = {{
                        width: 20,
                        height: 20,
                        tintColor: tintColor,
                    }}/>
            )},
        },
    },
    My: {
        screen: My,
        navigationOptions: {
            title: '我的',
            headerLeft: (<View/>),
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor}) => {
                return (<Image
                    source = {require('../images/my_normal_icon.png')}
                    style = {{
                        width: 25,
                        height: 25,
                        tintColor: tintColor,
                    }}/>
            )},
        },
    }}, {
    tabBarPosition: 'bottom',
    lazy: true,
    initialRouteName: 'Home',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
        showIcon: true,
        style: {
            height: 50,
            backgroundColor: '#ffffff',
            zIndex: 0,
            position: 'relative',
        },
        labelStyle: {
            fontSize: 11,
            paddingVertical: 0,
            marginTop: (Platform.OS === 'android' || (Platform.OS === 'ios' && Platform.Version < 10)) ? 0 : 15,
        },
        iconStyle: {
            marginTop: -2,
        },
        tabStyle: {
            backgroundColor: 'white',
        },
        activeBackgroundColor: '#fff',
        activeTintColor: color.theme,
        inactiveBackgroundColor:'white',
        inactiveTintColor: color.black,
    },
});

