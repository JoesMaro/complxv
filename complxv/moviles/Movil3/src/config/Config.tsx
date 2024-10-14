// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_yu9xYy_zSzUDJHOBJki0JC3dpF4NnMY",
  authDomain: "productos-baa37.firebaseapp.com",
  databaseURL: "https://productos-baa37-default-rtdb.firebaseio.com",
  projectId: "productos-baa37",
  storageBucket: "productos-baa37.appspot.com",
  messagingSenderId: "76361401786",
  appId: "1:76361401786:web:0224d85ab896d51a0fc983",
  measurementId: "G-DP21NYB2E6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});