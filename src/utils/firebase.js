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
  try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
  } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error code: ${errorCode}, message: ${errorMessage}`);
      throw error; // Re-throw the error so it can be caught and handled by the calling function
  }
};

export const Firebase_Logout = async () => {
  try {
    await signOut(auth);
    console.log("logged out");
  } catch (error) {
    console.log(error);
  }
}

export const Firebase_ResetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email: ", error);
    throw error; // Re-throw the error so it can be caught and handled by the calling function
  }
};