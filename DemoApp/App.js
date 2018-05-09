/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import * as firebase from 'firebase';

 const StatusBar = require('./components/StatusBar');
 const ActionButton = require('./components/ActionButton');
 const ListItem = require('./components/ListItem');
 const styles = require('./styles.js');

//import{Firebase} from "./android/app/src/components/Firebase";
import React, { Component } from 'react';
import ReactNative from 'react-native';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

//var firebase = require('firebase');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class App extends Component<Props> {
  constructor() {
    super();
    let ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      itemDataSource: ds
  }
  this.renderRow = this.renderRow.bind(this);
  this.pressRow = this.pressRow.bind(this);
}


  componentWillMount(){
    this.getItems();
  }
  componentDidMount() {
    this.getItems();
    // this.setState({
    //   datasource
    // })
    }

    getItems(){
      let items = [{title: 'Item One'},{title:'item Two'}];
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    }
    pressRow(item){
      console.log(item);
    }
    renderRow(item){
      return(
        <TouchableHighlight onPress={() =>{
          this.pressRow(item);
        }}>
        <View style={styles.li}>
        <Text style={styles.liText}>{item.title}</Text>
        </View>
        </TouchableHighlight>
      )
    }
  render() {
    return (
         <View style={styles.container}>

           <StatusBar title="Grocery List"/>

    <ListView dataSource={this.state.itemDataSource}
           renderRow={this.renderRow}
            style={styles.listview}/>


         </View>
       );
  }
}


class DemoApp extends Component {
  render() {
    return (
      <View style="{styles.container}">
      //I'm a container lol!
      </View>
    );
  }
}
