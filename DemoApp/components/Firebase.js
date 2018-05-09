// Initialize Firebase
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDFq8H6qBUGQOkmX3EuJqbiliJHTWQDriY",
  authDomain: "devliftdemodb.firebaseapp.com",
  databaseURL: "https://devliftdemodb.firebaseio.com",
  projectId: "devliftdemodb",
  storageBucket: "devliftdemodb.appspot.com",
  messagingSenderId: "334251622332"
};


export default class Firebase{

  static auth;

static init(){
  firebase.InitializeApp(config);
  Firebase.auth = firebase.auth();
}
}
