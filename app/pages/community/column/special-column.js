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

import HomeCell from '../../home/home-cell';
import api from '../../../api/api';
import Constroller from '../../../base/controller';

export default class SpecialColumn extends Constroller {

    constructor(props) {
        super(props);
        this.datas = [];
    }

    componentDidMount() {
        this._startRequest();
    }

    _startRequest = () => {
        this.loading();
        api.get({
            api: 'special_column/'
        }, (json) => {
            if (json.code === 0) {
                this.datas = json.data.list;
                this.loading(false);
            }else {
                this.toast(json.message);
            }
        });
    };

    _clickItem = (item) => {
        this.push('Webv', {linkUrl: item.linkUrl, title: item.title});
    };

    render() {
        return (
            <View style = {styles.view}>
                <FlatList
                    style = {styles.list}
                    data = {this.datas}
                    renderItem = {({item,index}) => (
                        <HomeCell
                            key = {index}
                            itemInfo = {item}
                            click = {() => {this._clickItem(item);}}
                        />
                    )}
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
