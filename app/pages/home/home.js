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

import React , {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
 }from 'react-native';

import HomeCell from './home-cell';
import Api from '../../api/api';
import Controller from '../../base/controller';

export default class Home extends Controller {

    constructor(props) {
        super(props);
        this.data_list = [];
        this.page = 1;
    }

    componentDidMount() {
        this._request();
    }

    _request = () => {
        this.loading();
        Api.get({
            api: 'home/',
            param: {
                page: this.page,
            }
        }, (json) => {
            if (this.page === 1) {
                this.data_list = [];
            }
            if (json.code === 0) {
                this.data_list = this.data_list.concat(json.data.list);
            }else {
                this.toast(json.message);
                this.data_list = [];
            }
            setTimeout(() => {
                this.loading(false);
            }, 2000);
        })
    };

    _onDownPullRefresh = (e) => {
        this.page = 1;
        this._request();
    };

    _onUpPullRefresh = (e) => {
        const {distanceFromEnd = 1} = e;
        if (distanceFromEnd < 0) {
            this.page += 1;
            this._request();
        }
    };

    _loadMoreItem = () => {
        return (
            <View style = {styles.footerLoad}>
                <Text>加载更多...</Text>
            </View>
        );
    };

    _clickItem = (item) => {
        this.push('Webv',{linkUrl: item.linkUrl, title: item.title});
    };

    render() {
        const {loading} = this.state;
        return (
            <View style = {{flex: 1}}>
                <FlatList
                    ListFooterComponent = {this._loadMoreItem}
                    refreshControl = {(
                        <RefreshControl
                            title = 'Loading'
                            onRefresh = {this._onDownPullRefresh}
                            refreshing = {loading}
                            colors = {['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                        />
                    )}
                    onEndReached = {this._onUpPullRefresh}
                    onEndReachedThreshold = {0}
                    style = {styles.list}
                    data = {this.data_list}
                    renderItem = {
                        ({item, index}) => (
                            <HomeCell key = {index} itemInfo = {item}
                                click = {() => {this._clickItem(item);}}
                            />
                        )
                    }>
                </FlatList>
                {super.render()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        marginTop: 0,
    },
    footerLoad: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

