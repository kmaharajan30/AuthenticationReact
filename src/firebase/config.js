
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDsmMaWN7LPaIjwWB3QzEwPv24ycNc1zzI",
  authDomain: "ecomm-9d621.firebaseapp.com",
  projectId: "ecomm-9d621",
  storageBucket: "ecomm-9d621.appspot.com",
  messagingSenderId: "1002610341864",
  appId: "1:1002610341864:web:bd6a052c199ec0d648165d"
};


const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;