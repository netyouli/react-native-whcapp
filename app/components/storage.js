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
import {AsyncStorage} from 'react-native';

export default class Storage {

    /**
     * 通过key获取存储值
     * @param key
     * @param block
     */
    static value(key, block) {
        if (key) {
            AsyncStorage.getItem(key, (error, value) => {
                block && !error && block(JSON.parse(value));
            });
        }
    }


    /**
     * 存储key，value
     * @param key
     * @param value
     * @param block
     */
    static set(key, value, block) {
        if (value && key) {
            if (typeof value === 'string') {
                AsyncStorage.setItem(key, value);
            }else if (value instanceof Object) {
                AsyncStorage.setItem(key, JSON.stringify(value), block);
            }
        }
    }

    /**
     * 移除key对应值
     * @param key
     * @param block
     */
    static remove(key, block) {
        if (key) {
            AsyncStorage.removeItem(key, block);
        }
    }
}
