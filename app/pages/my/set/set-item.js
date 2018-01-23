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
    TouchableHighlight,
} from 'react-native';


SetItem = ({
title,
value,
onClick,
}) => {
    return (
        <TouchableHighlight onPress = {onClick}>
            <View style = {styles.view}>
                <Text style = {styles.title}>{title}</Text>
                <Text style = {styles.value}>{value}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    view: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    title: {
        textAlign: 'left',
        flexGrow: 1,
    },
    value: {
        textAlign: 'right',
        flexGrow: 1,
    },
});

export default SetItem;
