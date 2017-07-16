import firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyBRYMDh-hJEYpWI1mg_2P36bvjT3n7jhuo",
    authDomain: "reactfreelance.firebaseapp.com",
    databaseURL: "https://reactfreelance.firebaseio.com",
    projectId: "reactfreelance",
    storageBucket: "",
    messagingSenderId: "1020252082009"
  };
  firebase.initializeApp(config);

const database = firebase.database();
export default database;