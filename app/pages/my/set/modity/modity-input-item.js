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
    TextInput,
} from 'react-native';

import WHCLine from '../../../../components/whc-line';

ModityInputItem = ({
hint,
ispasswrod,
fontSize,
value,
onChangeText,
}) => {
    return (
        [<View style = {styles.view}>
            <TextInput placeholder = {hint}
             underlineColorAndroid ='transparent'
                      defaultValue = {value || ''}
                          fontSize = {fontSize || 14}
                   secureTextEntry = {ispasswrod || false}
                      onChangeText = {onChangeText}/>
        </View>,
        <WHCLine/>]
    );
}

const styles = StyleSheet.create({
    view: {
        padding: 15,
        backgroundColor: 'white',
    },
});

export default ModityInputItem;
