/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import * as firebase from "firebase";

 const config = {
   apiKey: "AIzaSyDFq8H6qBUGQOkmX3EuJqbiliJHTWQDriY",
   authDomain: "devliftdemodb.firebaseapp.com",
   databaseURL: "https://devliftdemodb.firebaseio.com",
   projectId: "devliftdemodb",
   storageBucket: "devliftdemodb.appspot.com",
   messagingSenderId: "334251622332"
 };

const firebaseApp = firebase.initializeApp(config);

 const StatusBar = require('./components/StatusBar');
 const ActionButton = require('./components/ActionButton');
 const ListItem = require('./components/ListItem');
 const styles = require('./styles.js');
 //const firebaseApp = require('./components/Firebase');

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
  //The constructor will init this.itemsRef with the child items via the getref func
  this.itemsRef = this.getRef().child('items');

  this.renderRow = this.renderRow.bind(this);
  this.pressRow = this.pressRow.bind(this);
}

getRef(){ //getref pulls the data from firebase
  return firebaseApp.database().ref();
}


  componentWillMount(){
    this.getItems(this.itemsRef);
  }
  componentDidMount() {
    this.getItems(this.itemsRef);
    // this.setState({
    //   datasource
    // })
    }

    getItems(itemsRef){
      //let items = [{title: 'Item One'},{title:'item Two'}];

      //When we get the values from itemsRef push it onto an array
      itemsRef.on('value',(snap) =>{
        let items = [];
        snap.forEach((child)=>{
          items.push({
            title: child.val().title,
            _key: child.key
          });
        });
        this.setState({
          itemDataSource: this.state.itemDataSource.cloneWithRows(items)
        });
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
