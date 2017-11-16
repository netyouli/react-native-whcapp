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
    View,
    ScrollView,
    StyleSheet,
    Alert,
} from 'react-native';

import MyHeader from './MyHeader';
import WHCLine from '../../components/WHCLine';
import MyItem from './MyItem';

class My extends Component {

    static navigationOptions = {
        title: '我的',
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    _clickItem = (e) => {
        const {navigate} = this.props.navigation;
        navigate('Blank');
    }

    render() {
        return (
            <ScrollView style = {styles.scrollView}>
                <MyHeader style = {styles.header}
                    click = {this._clickItem}/>
                <WHCLine/>
                <View style = {styles.section1}>
                    <MyItem img = {require('../../images/my_love_icon.png')}
                            title = {'我喜欢的'}
                            value = {'48篇'}
                            click = {this._clickItem}
                    />
                    <MyItem img = {require('../../images/my_collect_icon.png')}
                            title = {'收藏集'}
                            value = {'1个'}
                            click = {this._clickItem}
                    />
                    <MyItem img = {require('../../images/my_read_icon.png')}
                            title = {'阅读过的文章'}
                            value = {'100篇'}
                            click = {this._clickItem}
                    />
                </View>

                <View style = {styles.section2}>
                    <MyItem img = {require('../../images/my_suggest_icon.png')}
                            title = {'意见反馈'}
                            click = {this._clickItem}
                    />
                    <MyItem img = {require('../../images/my_switch_icon.png')}
                            title = {'夜间模式'}
                            isSwitch = {true}
                            click = {this._clickItem}
                    />
                    <MyItem img = {require('../../images/my_set_icon.png')}
                            title = {'设置'}
                            click = {this._clickItem}
                    />
                </View>
            </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
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

export default My;
