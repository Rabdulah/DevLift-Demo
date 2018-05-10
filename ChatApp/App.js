/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
//const styles = require('./styles.js');

import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import{
  Router,
  Scene,
}from 'react-native-router-flux';

import Home from './src/components/Home';
import Chat from './src/components/Chat';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      /*The app is rooted here, and from here
      it can navigate to the two scenes 'home' and 'chat'
      */
    <Router>
    <Scene key='root'>
    <Scene key='home' component = {Home} title='Home'/>
    <Scene key='chat' component = {Chat} title = 'Chat'/>
    </Scene>
    </Router>
    );
  }
}
