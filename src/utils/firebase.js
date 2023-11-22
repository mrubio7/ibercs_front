import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCX9S8IWndA4m5drCO33t4jqAv_rv9etKs",
    authDomain: "csplaza-52752.firebaseapp.com",
    projectId: "csplaza-52752",
    storageBucket: "csplaza-52752.appspot.com",
    messagingSenderId: "456398127166",
    appId: "1:456398127166:web:0d331754739a58a26e116f",
    measurementId: "G-ZFQNBG3GNF"
  };

let app = undefined;
try { 
	app = app("ibercs");
}
catch(e) {
	app = initializeApp(firebaseConfig , "ibercs");
}

export const auth = getAuth(app);

export const Firebase_Login = async (email, password) => {
	setPersistence(auth, browserLocalPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
};

export const Firebase_Logout = async () => {
  try {
    await signOut(auth);
    console.log("logged out");
  } catch (error) {
    console.log(error);
  }
}