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

import BaseList from '../../../base/base-list';
import Api from '../../../api/api';

export default class OfflineActivity extends BaseList {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._startRequest();
    }

    _startRequest = () => {
        this.loading(true);
        Api.get({api: 'offine_activity/'}, (json) => {
            if (json.code !== 0) {
                this.toast(json.message);
            }else {
                this.reloadData(json.data.list);
            }
        });
    }

    render() {
        return super.render();
    }
}
