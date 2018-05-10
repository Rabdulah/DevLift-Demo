import React from 'react';

const styles = require('../../styles.js');

import{
  View,
  Text,
  TextInput,
  TouchableOpacity,
}from 'react-native';

import{
  Actions,
}from 'react-native-router-flux';

class Home extends React.Component{
  state = {
    name: '',
  };
  render(){
    return(
      <View>
      <Text style={styles.title}>
      Create a username:
      </Text>
      <TextInput style = {styles.nameInput}
      placeholder='Neo'
      onChangeText = {(text)=>{
        this.setState({
          name: text,
        });
      }}
      value={this.state.name}
      />
      <TouchableOpacity onPress={() =>{
        //'chat' rather than'Chat' because that's what we named the scene key
        Actions.chat({
          text: this.state.name,
        })
        //console.log(this.state.name);
      }}>
      <Text style= {styles.buttonText}>
      Next
      </Text>
      </TouchableOpacity>
      </View>
    );

  }
}

export default Home;
