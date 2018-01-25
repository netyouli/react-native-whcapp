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
    FlatList,
    StyleSheet,
    View,
} from 'react-native';

import CommunityCell from '../pages/community/community-cell';
import Controller from './controller';

export default class BaseList extends Controller {

    constructor(props) {
        super(props);
        this.datas = [];
    }

    reloadData = (data) => {
        setTimeout(() => {
            this.datas = data;
            this.loading(false);
        }, 1000);
    };

    clickItem = (item) => {
        this.push('Webv', {linkUrl: item.linkUrl, title: item.title});
    };

    render() {
        return (
            <View style = {styles.view}>
                <FlatList
                    style = {styles.list}
                    data = {this.datas}
                    renderItem = {
                        ({item, index}) => (
                            <CommunityCell key = {index} item = {item} click = {() => {
                                this.clickItem(item);
                            }}/>
                        )
                    }
                />
                {super.render()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
});
