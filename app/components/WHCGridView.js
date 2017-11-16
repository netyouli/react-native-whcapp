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
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    FlatList,
    ViewPropTypes,
} from 'react-native';

const propTypes = {
    column: PropTypes.number,
    data: PropTypes.array,
    renderItem: PropTypes.func,
    style: ViewPropTypes.style,
    rowSeparatorLineRender: PropTypes.func,
    columnSeparatorLineRender: PropTypes.func,
};

const WHCGridView = ({
column,
data,
renderItem,
style,
rowSeparatorLineRender,
columnSeparatorLineRender,
}) => {
    if (column == 0 || data.length == 0) {
        return null;
    }else {
        const length = data.length;
        const rowCount = length / column + (length % column != 0 ? 1 : 0);
        let datas = new Array();
        for (let r = 0; r < rowCount; r++) {
            let items = new Array();
            for (let c = 0; c < column; c++) {
                const index = r * column + c;
                if (index < length) {
                    items.push(data[index]);
                }else {
                    items.push({});
                }
            }
            datas.push(items);
        }
        return (
            <View style = {style}>
                <FlatList style = {styles.list}
                    data = {datas}
                    ItemSeparatorComponent = {rowSeparatorLineRender != null ? rowSeparatorLineRender : null}
                    renderItem = {({item, index}) => {
                        let itemview = new Array();
                        let linecount = columnSeparatorLineRender != null ? Math.min(0, column - 1) : 0;
                        item.forEach((e, idx) => {
                            itemview.push(renderItem(e, index * column + idx));
                            if (idx < column - 1 && columnSeparatorLineRender != null) {
                                itemview.push(columnSeparatorLineRender());
                            }
                        });
                        return (<View style = {styles.item} key = {index}>
                            {itemview}
                        </View>);
                    }}
                />
            </View>
        );
    }
};

WHCGridView.propTypes = propTypes;

WHCGridView.defaultProps = {
    column: 1,
    data: [],
    renderItem(){},
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default WHCGridView;
