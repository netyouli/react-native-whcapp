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
    ScrollView,
    Image,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';

import * as screen from '../constants/screen';
import * as color from '../constants/color'

class WHCBannerIndicater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageindex: 0,
        };
    }

    updatePageIndex = (index) => {
        this.setState({
            pageindex: index,
        });
    };

    render() {
        const {page} = this.props;
        const pageIndex = this.state.pageindex;
        let pageTexts = [];
        for (let i = 0; i < page; i++) {
            if (i === pageIndex) {
                pageTexts.push((<View key = {i} style = {[styles.dot, {backgroundColor: color.theme}]}/>))
            }else {
                pageTexts.push((<View key = {i} style = {styles.dot}/>))
            }
        }
        return (
            <View style = {styles.indicater}>
                {pageTexts}
            </View>
        );
    }
}

class WHCBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.pageindex = 0;
        this.offsetx = 0;
    }

    componentDidMount() {
        this.timout = setTimeout(() => {
            this._goIndex(1);
        }, 100);
        this._makeTimer();
    }

    componentWillUnmount() {
        this.timeout && clearTimeout(this.timout);
        this._clearTimer();
    }

    _onMomentumScrollEnd = (e) => {
        const offsetx = e.nativeEvent.contentOffset.x;
        const count = this.imagecount;
        const index = Math.floor((offsetx - screen.width / 2.0) / screen.width) + 1;
        if (index === 0) {
            this.pageindex = count - 1;
        }else if (index === count + 1) {
            this.pageindex = 0;
        }else {
            this.pageindex = index - 1;
        }
        this.indicater.updatePageIndex(this.pageindex);
    };

    _onScrollBeginDrag = (e) => {
        this._clearTimer();
    };

    _onScrollEndDrag = (e) => {
        const offsetx = e.nativeEvent.contentOffset.x;
        const count = this.imagecount;
        if (offsetx === (count + 1) * screen.width) {
            this._goIndex(1);
        }else if (offsetx === 0) {
            this._goIndex(count);
        }
        this._makeTimer();
    };

    _onScroll = (e) => {
        const offsetx = e.nativeEvent.contentOffset.x;
        const index = Math.floor((offsetx - screen.width / 2.0) / screen.width) + 1;
        const count = this.imagecount;
        const isLeftScroll = this.offsetx <= offsetx;
        if (offsetx <= 0) {
            if (isLeftScroll) {
                return;
            }
            this._goIndex(count);
        }else if (offsetx >= (count + 1) * screen.width) {
            if (!isLeftScroll) {
                return;
            }
            this._goIndex(1);
        }
        this.offsetx = offsetx;
    };

    _goIndex = (index, animated) => {
        this.offsetx = index * screen.width;
        this.scrollview.scrollTo({x: index * screen.width, y: 0, animated: animated || false});
    };

    _makeTimer = () => {
        const interval = this.props.interval || 3;
        this.timer = setInterval(() => {
            this.offsetx = -1;
            this.pageindex += 1;
            this._goIndex(this.pageindex, true);
        }, interval * 1000);
    };

    _clearTimer = () => {
        this.timer && clearTimeout(this.timer);
    };

    render() {
        const {urls, style, renderIndicater, onPress} = this.props;
        if (urls != null && urls.length > 0) {
            const column = urls.length;
            let imagelist = [];
            this.imagecount = column;
            let url_list = [urls[column - 1]];
            url_list = url_list.concat(urls);
            url_list.push(urls[0]);
            url_list.forEach((e, index) => {
                let source = null;
                if (e.startsWith('http')) {
                    source = {uri: e};
                }else {
                    source = e;
                }
                imagelist.push((
                    <TouchableHighlight key = {index} onPress = {() => {onPress !== void 0 && onPress(e, index)}}>
                        <Image style = {styles.img} source = {source} resizeMode = {'stretch'}/>
                    </TouchableHighlight>
                ))
            });
            return (
                <View style = {style}>
                    <ScrollView
                        ref = {(ref) => {this.scrollview = ref}}
                        style = {{flex: 1}}
                        horizontal = {true}
                        showsHorizontalScrollIndicator = {false}
                        pagingEnabled = {true}
                        bounces = {false}
                        // scrollEventThrottle = {1}
                        onMomentumScrollEnd = {this._onMomentumScrollEnd}
                        onScrollBeginDrag = {this._onScrollBeginDrag}
                        onScrollEndDrag = {this._onScrollEndDrag}
                        onScroll = {this._onScroll}>
                        {imagelist}
                    </ScrollView>
                    {renderIndicater === void 0 ? (<WHCBannerIndicater
                        ref = {(ref) => {this.indicater = ref}}
                        page = {column}
                    />) : renderIndicater(column)}
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    img: {
        flex: 1,
        width: screen.width,
    },
    indicater: {
        position: 'absolute',
        height: 30,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        bottom: 0,
        width: screen.width,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    dot: {
        backgroundColor: 'white',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
});

export default WHCBanner;
