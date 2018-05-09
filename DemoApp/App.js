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
  TouchableHighlight,
  Modal,
  TextInput,
  Alert
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
      text: '',
      itemDataSource: ds,
      modalVisible: false
  }
  //The constructor will init this.itemsRef with the child items via the getref func
  this.itemsRef = this.getRef().child('items');

  this.renderRow = this.renderRow.bind(this);
  this.pressRow = this.pressRow.bind(this);
}

//set the state of the modal to whatever we pass into visible ==> true or false
setModalVisible(visible){
  this.setState({modalVisible:visible});
}

//Need this to clear text after saving or canceling, else textbox keeps old input which is kinda annoying
clearText(){
  this.setState({text: ''});
}

getRef(){ //getref pulls the data from firebase
  return firebaseApp.database().ref();
}


  componentWillMount(){
    this.getItems(this.itemsRef);
  }
  componentDidMount() {
    this.getItems(this.itemsRef);
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
      //this.itemsRef.child(item._key).remove();
      Alert.alert(
  'Delete Grocery?',
  'Selecting Complete will delete the grocery from your list',
  [
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'Complete', onPress: () => {this.itemsRef.child(item._key).remove();}},
  ]
)
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

    addItem(){
this.setModalVisible(true);
    }
  render() {
    return (
         <View style={styles.container}>
         <Modal
   animationType="slide"
   transparent={false}
   visible={this.state.modalVisible}
   onRequestClose={() => {

   }}>
   <View style={{marginTop: 22}}>
     <View>
       <StatusBar title="Add Item"/>

       <TextInput value={this.state.text}
       placeholder="Add Item"
       onChangeText = {(value)=> this.setState({text:value})}
        />

       <TouchableHighlight
       style={styles.action}
         onPress={() => {
           this.itemsRef.push({title: this.state.text});
           this.setModalVisible(!this.state.modalVisible);
           this.clearText();
         }}>
         <Text>Save Item</Text>
       </TouchableHighlight>

       <TouchableHighlight
       style={styles.cancel}
         onPress={() => {
           this.setModalVisible(!this.state.modalVisible);
           this.clearText();
         }}>
         <Text>Cancel</Text>
       </TouchableHighlight>
     </View>
   </View>
 </Modal>

           <StatusBar title="Grocery List"/>
            <ListView dataSource={this.state.itemDataSource}
              renderRow={this.renderRow}
                style={styles.listview}
            />

            <ActionButton onPress={this.addItem.bind(this)} title = "Add Item" />
         </View>
       );
  }
}
