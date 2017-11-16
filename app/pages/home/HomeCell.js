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
    Image,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';

import * as font from '../../constants/WHCFont';
import WHCImageButton from '../../components/WHCImageButton';

class HomeCell extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _clickCollection = (e) => {
        Alert.alert('点击收藏');
    }

    _clickMsg = (e) => {
        Alert.alert('点击阅读消息');
    }

    render() {
        const item = this.props.itemInfo;
        const click = this.props.click;
        return (
            <TouchableHighlight onPress = {click}>
                <View style = {styles.item}>
                    <View style = {styles.topsegv}/>
                    <View style = {styles.topv}>
                        <Image style = {styles.userImg}
                            source = {item.userIcon}
                        />
                        <Text style = {styles.author}>{item.author}</Text>
                        <Text style ={styles.date}>发布日期: {item.date}</Text>
                    </View>
                    <View style = {styles.bottomv}>
                        <View style = {styles.bottomleft}>
                            <Text style = {styles.title} numberOfLines = {2}>{item.title}</Text>
                            <Text style = {styles.content} numberOfLines = {2}>{item.detail}</Text>
                        </View>
                        <Image style = {styles.logoImg}
                            source = {item.logoUrl}
                        />
                    </View>
                    <View style = {styles.bottombar}>
                        <WHCImageButton
                            style = {styles.bottomButton}
                            imageSource = {item.collectionIcon}
                            text = {item.collectionCount}
                            imageStyle = {styles.collectionImg}
                            textStyle = {styles.bottomButtonText}
                            underlayColor = 'transparent'
                            onPress = {this._clickCollection}
                        />

                        <WHCImageButton
                            style = {styles.bottomButton}
                            imageSource = {item.msgIcon}
                            text = {item.msgCount}
                            imageStyle = {styles.msgImg}
                            textStyle = {styles.bottomButtonText}
                            underlayColor = 'transparent'
                            onPress = {this._clickMsg}
                        />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    topsegv: {
        backgroundColor: '#F4F6F9',
        height: 15,
    },
    topv: {
        flexDirection: 'row',
        marginTop: 25,
        alignItems: 'center',
    },
    bottomv: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingRight: 20,
        height: 110,
    },
    bottomleft: {
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 10,
        flexShrink: 1,
        height: 90,
    },
    author: {
        marginLeft: 8,
    },
    logoImg: {
        height: 90,
        width: 90,
        borderRadius: 3,
        flexShrink: 0,

    },
    date: {
        textAlign: 'right',
        flexGrow: 1,
        marginRight: 20,
        color: '#8D9DA0',
    },
    item: {
        paddingTop: 0,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 17,
        color: font.themeBlack,
        fontWeight: 'bold',
    },
    content: {
        marginTop: 8,
        fontSize: 14,
        color: '#647079',
        flex: 1,

    },
    userImg: {
        height: 30,
        width: 30,
        marginLeft: 20,
        borderRadius: 15,
    },
    bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomButtonText: {
        color: '#94A2B0',
        fontSize: 12,
        marginLeft: 5,
    },
    bottombar: {
        flexDirection: 'row',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
    },
    msgImg: {
        width: 13,
        height: 13,
        marginLeft: 20,
    },
    collectionImg: {
        width: 16,
        height: 16,
    },
});

export default HomeCell;
