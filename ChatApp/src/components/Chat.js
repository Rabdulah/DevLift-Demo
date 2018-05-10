import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import Backend from '../../Backend';
import{
  View,
  Text,

}from 'react-native';

class Chat extends React.Component{
  state = {
    messages:[],
  };
  componentWillMount(){

  }
  render(){
    return(
        <GiftedChat
          messages={this.state.messages}
          onSend={(message)=> {
            Backend.sendMessage(message);
          }}
          user={{
            _id:Backend.getUid(),
            name: this.props.name,
          }}
          />
    );

  }
  componentDidMount(){
    Backend.loadMessages((message)=>{
      this.setState((previousState)=>{
        return{
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }
  componentWillUMount(){
    Backend.closeChat();
  }
}

Chat.defaultProps={
  text : 'anon',
}

// Chat.propTypes = {
//   name: React.PropTypes.string,
// }


export default Chat;
