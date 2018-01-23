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
    ScrollView,
} from 'react-native';
import SetItem from '../set/set-item';
import WHCLine from '../../../components/whc-line';
import Controller from '../../../base/controller';

export default class User extends Controller {

    constructor(props) {
        super(props);
    }

    render() {
        const {user_info} = this.props.navigation.state.params;
        return (
            <View style = {styles.v}>
                <ScrollView>
                    <SetItem title = {'用户名'}
                        value = {user_info.username}
                    />
                    <WHCLine/>
                    <SetItem title = {'邮箱'}
                        value = {user_info.email}
                    />
                    <WHCLine/>
                    <SetItem title = {'手机号'}
                         value = {user_info.mobile}
                    />
                    <WHCLine/>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    v: {
        flex: 1,
    },
});
