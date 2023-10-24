import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBxttSsed4CEdBtkgbosUX22G9P3vJx_IA",
    authDomain: "myfirstapp-ad26a.firebaseapp.com",
    projectId: "myfirstapp-ad26a",
    storageBucket: "myfirstapp-ad26a.appspot.com",
    messagingSenderId: "543857348059",
    appId: "1:543857348059:web:2f578058902653e8542bfe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;
