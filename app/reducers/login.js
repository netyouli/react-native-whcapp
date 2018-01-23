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

import * as types from '../constants/action-type';

const initState = {
    isLogin: false,
    userInfo: {},
};

export default function loginState(state=initState, action) {
    switch (action.type) {
        case types.DID_LOGIN:
            return {
                ...state,
                isLogin: true,
                userInfo: action.userInfo,
            };
        case types.DID_LOGOUT:
            return {
                ...state,
                isLogin: false,
                userInfo: {},
            };
        default:
            return state;
    }
}
