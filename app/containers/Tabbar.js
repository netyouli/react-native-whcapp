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
import {TabNavigator} from 'react-navigation';
import {
    Image,

} from 'react-native';

import Home from '../pages/home/Home';
import Community from '../pages/community/Community';
import My from '../pages/my/My';

import * as font from '../constants/WHCFont';

const Tabbar = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor}) => {
                return(
                <Image
                    source = {require('../images/home_normal_icon.png')}
                    style = {{
                        width: 20,
                        height: 20,
                        tintColor: tintColor,
                    }}></Image>
            )},
        },
    },
    Community: {
        screen: Community,
        navigationOptions: {
            tabBarLabel: '社区',
            tabBarIcon: ({tintColor}) => {
                return (
                <Image
                    source = {require('../images/community_normal_icon.png')}
                    style = {{
                        width: 20,
                        height: 20,
                        tintColor: tintColor,
                    }}></Image>
            )},
        },
    },
    My: {
        screen: My,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor}) => {
                return (
                <Image
                    source = {require('../images/my_normal_icon.png')}
                    style = {{
                        width: 25,
                        height: 25,
                        tintColor: tintColor,
                    }}></Image>
            )},
        },
    }}, {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
        style: {
            height: 49,
        },
        activeBackgroundColor: '#fff',
        activeTintColor: font.themeColor,
        inactiveBackgroundColor:'white',
        inactiveTintColor:font.themeBlack,
    },
});



export default Tabbar;
