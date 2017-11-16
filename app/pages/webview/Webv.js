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


import React ,{Component} from 'react';
import {
    View,
    WebView,
    StyleSheet,
    BackHandler,
} from 'react-native';

class Webv extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title,
    })

    constructor(props) {
        super(props);
        this.canGoBack = false;
        this.state = {};
    }

    componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', this._goBack);
    }

    _goBack = () => {
        if (this.canGoBack) {
            this.webview.goBack();
            return true;
        }
        return false;
    }

    _onNavigationStateChange = (navState) => {
        this.canGoBack = navState.canGoBack;
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style = {styles.view}>
                <WebView
                    ref = {(ref) => {this.webview = ref}}
                    style = {styles.web}
                    onNavigationStateChange = {this._onNavigationStateChange}
                    source = {{uri: params.linkUrl}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    web: {
        flex: 1,
    }
});

export default Webv;
