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
  Text,
  ListView,
  FlatList,
  Image,
  TouchableHighlight,
  Alert,
  RefreshControl,
  ActivityIndicator,
 }from 'react-native';

import HomeCell from './HomeCell';

import {itemInfos} from './HomeModel';

class Home extends Component {

    static navigationOptions = {
        title: "首页",
    }

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            footerLoading: false,
        };
    }

    componentWillUnmount() {

    }

    _onRefresh = (e) => {
        this.setState({
            refreshing: true,
            footerloading: false,
        });
        setTimeout(() => {
            this.setState({
                refreshing: false,
                footerloading: false,
            });
        }, 3000);
    }

    _onFooterLoadMore = (e) => {
        this.setState({
            refreshing: false,
            footerloading: true,
        });
        setTimeout(() => {
            this.setState({
                refreshing: false,
                footerloading: false,
            });
        },3000);
    }

    _loadMoreItem = () => {
        const footerloading = this.state.footerloading;
        if (footerloading) {
            return (
                <View style = {styles.footerLoad}>
                    <ActivityIndicator
                        animating={footerloading}
                        size = {'small'}
                    />
                </View>
            )
        }
        return null;
    }

    _clickItem = (item) => {
        const {navigate} = this.props.navigation;
        navigate('Webv', {linkUrl: item.linkUrl, title: item.title});
    }

    render() {
        const {refreshing, footerloading} = this.state;
        return (
            <View style = {{flex: 1}}>
                <FlatList
                    ListFooterComponent = {this._loadMoreItem}
                    refreshControl = {(
                        <RefreshControl
                            title = 'Loading'
                            onRefresh = {this._onRefresh}
                            refreshing = {refreshing}
                            colors = {['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                        />
                    )}
                    onEndReached = {this._onFooterLoadMore}
                    onEndReachedThreshold = {1}
                    style = {styles.list}
                    data = {itemInfos}
                    renderItem = {
                        ({item, index}) => (
                            <HomeCell itemInfo = {item}
                                click = {() => {this._clickItem(item);}}
                            />
                        )
                    }>
                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    v: {
        flex: 1,
        backgroundColor: '#F4F6F9',
    },
    list: {
        marginTop: 0,
    },
    footerLoad: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default Home;
