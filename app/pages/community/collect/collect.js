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
    StyleSheet,
    FlatList,
} from 'react-native';

import CollectCell from './collect-cell';
import Api from '../../../api/api';
import {CollectType} from '../../../constants/app-constant';
import Controller from '../../../base/controller';

class Collect extends Controller {

    constructor(props) {
        super(props);
        this.datas = [];
    }

    componentDidMount() {
        this._startRequest();
    }

    _startRequest = () => {
        this.loading();
        let api = '';
        const {type = CollectType.my_collect} = this.props.navigation.state.params;
        switch (type) {
            case CollectType.my_collect:
                api = 'my_collect/';
                break;
            case CollectType.collect_set:
                api = 'collect/';
                break;
            default:

        }
        Api.get({api: api}, (json) => {
            if (json.code !== 0) {
                this.toast(json.message);
            }else {
                this.datas = json.data.list;
                this.loading(false);
            }
        });
    };

    render() {
        return (
            <View style = {styles.view}>
                <FlatList style = {styles.list}
                          data = {this.datas}
                          renderItem = {({item, index}) => (
                              <CollectCell
                                  key = {index}
                                  item = {item}
                                  onClick = {(item) => {
                                      this.push('Webv', {linkUrl: item.linkUrl, title: item.title});
                                  }}/>
                          )}/>
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

export default Collect;
