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

export default class Tool {
    /**
     *  检查是否为电话号码
     */
    static istel(tel) {
        if (tel) {
            const check_tel = /(^1\d{10})/;
            return check_tel.test(tel);
        }
        return false;
    }

    /**
     * 检查是否为电子邮件
     */
    static isemail(email) {
        if (email) {
            const check_email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
            return check_email.test(email);
        }
        return false;
    }

    /**
     * 获取对象属性个数
     */
    static count(object) {
        if (object) {
            let count = 0;
            for (let key in object) {
                if (object.hasOwnProperty(key)) {
                    count += 1;
                }
            }
            return count;
        }
        return 0;
    }
}
