import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';


/*
const firebaseConfig = {
  apiKey: 'AIzaSyAOWHBpPhKoNhcGFKHH_Q_0AtL2gV-imgQ',
  authDomain: 'production-a9404.firebaseapp.com',
  databaseURL: 'https://production-a9404.firebaseio.com',
  projectId: 'production-a9404',
  storageBucket: 'production-a9404.appspot.com',
  messagingSenderId: '525472070731',
  appId: '1:525472070731:web:ee873bd62c0deb7eba61ce',
}; */


const firebaseConfig = {
  apiKey: "AIzaSyClJ7XbwI6yaishwajIC5FHd0gUAumZWcw",
  authDomain: "fitnessapp-28633.firebaseapp.com",
  projectId: "fitnessapp-28633",
  storageBucket: "fitnessapp-28633.appspot.com",
  messagingSenderId: "1018023029085",
  appId: "1:1018023029085:web:2559bf33c9d3dd6d5ee0b4"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
