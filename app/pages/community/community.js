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
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    FlatList,
    RefreshControl,
} from 'react-native';

import WHCBanner from '../../components/whc-banner';
import WHCGridView from '../../components/whc-grid-view';
import * as color from '../../constants/color';
import CommunitySection from './community-section';
import CommunityCell from './community-cell';
import Api from '../../api/api';
import Webv from '../webview/webv';
import {CollectType} from '../../constants/app-constant';
import Controller from '../../base/controller';

class Community extends Controller {

    static navigationOptions = (options) => {
        Controller.navigationOptions(options);
        options.headerLeft = (<View/>);
        return options;
    }

    constructor(props) {
        super(props);
        this.grid_menu = [
            {title: '本周最热',image: require('../../images/community_hot_icon.png')},
            {title: '收藏集', image: require('../../images/community_collect_icon.png')},
            {title: '线下活动', image: require('../../images/community_active_icon.png')},
            {title: '专栏', image: require('../../images/community_column_icon.png')},
        ];
    }

    componentDidMount() {
        this._startRequest();
    }

    _onRefresh = (e) => {
        this._startRequest();
    };

    _startRequest = () => {
        this.loading();
        Api.get({
            api: 'community'
        }, (json) => {
            this.datas = [];
            if (json.code === 0) {
                this.datas.push(json.data.banner);
                this.datas.push(this.grid_menu);
                this.datas.push({});
                this.datas = this.datas.concat(json.data.hot_article);
                setTimeout(() => {
                    this.loading(false);
                }, 1000);
            }else {
                this.toast(json.message);
            }
        });
    };

    _clickTopItem = (index, item = null) => {
        switch(index){
            case 0: { /// 本周最热
                this.push('WeekHot', {title: '本周最热'});
            }
            break;
            case 1:  { /// 我的收藏
                this.push('Collect', {title: '收藏集', type: CollectType.collect_set});
            }
            break;
            case 2: { /// 线下活动
                this.push('OfflineActivity', {title: '线下活动'});
            }
            break;
            case 3: {/// 专栏
                this.push('SpecialColumn', {title: '专栏'});
            }
            break;
            default: {
                this.push('Webv', {title: item.title, linkUrl: item.linkUrl});
            }
        }
    };

    _cell = ({item, index}) => {
        switch (index) {
            case 0: {
                return (
                    <WHCBanner
                        style = {styles.banner}
                        urls = {(() => {
                            let urls = [];
                            item.forEach((value) => {
                                urls.push(Api.main_url + value.image_url);
                            });
                            return urls;
                        })()}
                        onPress = {(e, index) => {
                            this.push('Webv',{title: '百度一下', linkUrl: item[index].link_url});
                        }}
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
                                key = {index}
                                onPress = {() => {this._clickTopItem(index)}}
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
            default:{
                return (
                    <CommunityCell item = {item} click = {() => {
                        this._clickTopItem(4,item)
                    }}/>
                );
            }
        }
    };

    render() {
        const {loading} = this.state;
        return (
            <View style = {{flex: 1}}>
                <FlatList
                    style = {styles.list}
                    data = {this.datas}
                    renderItem = {this._cell}
                    refreshControl = {(
                        <RefreshControl
                            title = 'Loading'
                            onRefresh = {this._onRefresh}
                            refreshing = {loading}
                            colors = {['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                        />
                    )}
                />
                {super.render()}
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
        color: color.black,
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
