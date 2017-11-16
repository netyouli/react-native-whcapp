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
    StyleSheet,
    Text,
} from 'react-native';

import { NavigationActions } from 'react-navigation';

class Launch extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            //const {navigate} = this.props.navigation;
            const routeName = 'Tabbar';
            const reset = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Tabbar'})]
            });
            this.props.navigation.dispatch(reset);
            // navigate('Tabbar');
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <View style = {styles.view}>
                <Text style = {styles.text}>WHC React Native App</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F06768',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Launch;
