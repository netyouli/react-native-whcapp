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

import {StackNavigator} from 'react-navigation';
import Launch from '../pages/launch/Launch';
import Tabbar from './Tabbar';
import Blank from '../pages/blank/Blank';
import Webv from '../pages/webview/Webv';

const AppNavigation  = StackNavigator({
    Launch: {
        screen: Launch,
    },
    Tabbar: {
        screen: Tabbar,
    },
    Blank: {
        screen: Blank,
    },
    Webv: {
        screen: Webv,
    },
},{
    initialRouteName: 'Launch', // 默认显示界面
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        headerBackTitle: null,  // 左上角返回键文字
        headerStyle: {
            backgroundColor: '#fff'
        },
        headerTitleStyle: {
            color: '#333'
        },
        cardStack: {
            gesturesEnabled: true
        }
    },
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
    onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  // 回调

});

export default AppNavigation;
