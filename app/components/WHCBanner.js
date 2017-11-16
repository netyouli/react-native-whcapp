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
import PropTypes from 'prop-types';
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    ViewPropTypes,
} from 'react-native';

import * as screen from '../constants/WHCScreen';

const propTypes = {
urls: PropTypes.array,
style: ViewPropTypes.style,
};

const WHCBanner = ({
urls,
style,
}) => {
    if (urls != null && urls.length > 0) {
        const column = urls.length;
        let imagelist = [];
        urls.forEach((e, index) => {
            imagelist.push((<Image style = {styles.img} source = {e} resizeMode = {'stretch'}/>))
        });
        return (
            <View style = {style}>
                <ScrollView
                    style = {{flex: 1}}
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    pagingEnabled = {true}
                >
                    {imagelist}
                </ScrollView>
            </View>
        );
    }
    return null;
};

WHCBanner.propTypes = propTypes;
WHCBanner.defaultProps = {
urls: [],
};

const styles = StyleSheet.create({
    img: {
        flex: 1,
        width: screen.width,
    },
});

export default WHCBanner;
