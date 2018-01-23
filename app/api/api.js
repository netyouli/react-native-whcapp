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

import account from './account';

export default class Api {
    static main_url = 'http://www.wuhaichao.com/app/';

    /**
     * 发送get请求
     */
    static get({api, param, headers}, block) {
        this.request({
            api: api,
            param: param,
            headers: headers,
            method: 'GET',
        }, block);
    }

    /**
     * 发送post请求
     */
    static post({api, param, headers}, block) {
        this.request({
            api: api,
            param: param,
            headers: headers,
            method: 'POST',
        }, block);
    }

    /**
     * 发送请求
     */
    static request({api = null,
                       param = {},
                       headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',},
                       method = 'GET'}, block) {
        if (api && api.length > 0) {
            param.token = account.token;
            if (headers.Accept === void 0) {
                headers.Accept = 'application/json';
            }
            if (headers['Content-Type'] === void 0) {
                headers['Content-Type'] = 'multipart/form-data';
            }
            let config = {
                method: method,
                headers: headers,
            };
            let url = this.main_url + api;
            if (method === 'GET') {
                let param_str = '';
                let index = 0;
                for(let key in param) {
                    param_str +=  (index === 0 ? '' : '&') + key + '=' + param[key];
                    index += 1;
                }
                url += (param_str === '' ? '' : '?') + param_str;
            } else {
                const formdata = new FormData();
                for(let key in param) {
                    formdata.append(key, param[key]);
                }
                config.body = formdata;
            }
            fetch(url, config)
            .then((response) => response.json())
            .then((json) => {
                const {token = ''} = json;
                if (token.length > 0) {
                    account.token = token;
                }
                account.did_login = account.token !== '';
                block && block(json || {
                    code: 1,
                    message: '发送请求失败',
                });
            });
        }else {
            block && block({
                code: 1,
                message: '发送请求失败',
            });
        }
    }
}
