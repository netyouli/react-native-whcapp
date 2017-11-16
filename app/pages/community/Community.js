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
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    Alert,
    FlatList,
    RefreshControl,
} from 'react-native';

import WHCBanner from '../../components/WHCBanner';
import WHCGridView from '../../components/WHCGridView';
import * as font from '../../constants/WHCFont';
import CommunitySection from './CommunitySection';
import CommunityCell from './CommunityCell';

import {datas} from './CommunityModel';

class Community extends Component {

    static navigationOptions = {
        title: '社区'
    }

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    _onRefresh = (e) => {
        this.setState({
            refreshing: true,
        });
        setTimeout(() => {
            this.setState({
                refreshing: false,
            });
        }, 3000);
    }

    _clickTopItem = (e) => {
        const {navigate} = this.props.navigation;
        navigate('Blank');
    }

    _cell = ({item, index}) => {
        switch (index) {
            case 0: {
                return (
                    <WHCBanner
                        style = {styles.banner}
                        urls = {item}
                    />
                );
            }
            case 1: {
                return (
                    <WHCGridView
                        style = {styles.grid}
                        column = {4}
                        data = {item}
                        renderItem = {(item, index) => (
                            <TouchableHighlight
                                onPress = {this._clickTopItem}
                                underlayColor = {'transparent'}>
                                <View style = {styles.item}>
                                    <Image style = {styles.itemImage} source = {item.image}/>
                                    <Text style = {styles.itemText}>{item.title}</Text>
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                );
            }
            case 2: {
                return (
                    <View style = {{backgroundColor: '#F4F6F9', paddingTop: 20, paddingBottom: 0.5}}>
                        <CommunitySection
                            image = {require('../../images/community_hot_section_icon.png')}
                            title = {'热门文章'}
                            markImage = {require('../../images/community_set_icon.png')}
                            markTitle = {'定制热门'}
                        />
                    </View>
                );
            }
            default: {
                return (
                    <CommunityCell item = {item} click = {this._clickTopItem}/>
                );
            }
        }
    }

    render() {
        const {refreshing} = this.state;
        return (
            <View style = {{flex: 1}}>
                <FlatList
                    style = {styles.list}
                    data = {datas}
                    renderItem = {this._cell}
                    refreshControl = {(
                        <RefreshControl
                            title = 'Loading'
                            onRefresh = {this._onRefresh}
                            refreshing = {refreshing}
                            colors = {['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                        />
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    banner: {
        height: 150,
    },
    list: {
        flex: 1,
    },
    grid: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        width: 80,
    },
    itemText: {
        color: font.themeBlack,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 15,
    },
    itemImage: {
        width: 30,
        height: 30,
    },
});

export default Community;
