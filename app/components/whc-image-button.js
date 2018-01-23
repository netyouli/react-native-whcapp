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
    TouchableHighlight,
    Text,
    Image,
    View,
}from 'react-native';

class WHCImageButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {onPress, style, imageStyle, textStyle, imageSource, text, underlayColor} = this.props;
        return (
            <TouchableHighlight
                underlayColor = {underlayColor}
                onPress = {onPress}>
                <View style = {style}>
                    <Image style = {imageStyle} source = {imageSource}/>
                    <Text style = {textStyle}>{text}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

export default WHCImageButton;
