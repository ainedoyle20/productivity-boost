import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChORLRul0V5hyq6T99gbHKqM3EKJYCBC4",
  authDomain: "productivity-boost-dff28.firebaseapp.com",
  projectId: "productivity-boost-dff28",
  storageBucket: "productivity-boost-dff28.appspot.com",
  messagingSenderId: "510473286231",
  appId: "1:510473286231:web:efc22f590630f836df6912"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { uid } = userCredential.user;
    console.log("uid: ", uid);
    return uid;
  } catch (error) {
    const errorCode = error.code;
    console.log("Error registering user.", error, "Error Message: ", error.message, "Error code: ", errorCode);
    alert("Sorry, something went wrong. Please try again later.");
  }
}

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { uid } = userCredential.user;
    console.log("uid: ", uid);
    return uid;
  } catch (error) {
    console.log("Error logging in user.", error, "Error Message: ", error.message, "Error code: ", errorCode);
    alert("Logging in failed.");
  }
}


// fire when user successfully logs in (need user uid)
export const getTodos = async () => {
  const docRef = doc(db, "todos", "jnrws31qnRBia6AFghSe");
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data: ", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined
      // SET TODOS DOCUMENT FOR THIS USER (user must be new if no todos document!)
      // add todays date in document and return the empty array of todos
      console.log("No such document exists!");
    }
  } catch (error) {
    console.log("Error getting todos: ", error.message);
    alert("Sorry somthing went wrong. Please try again later.");
  }
}

// fire when user enters progress page
export const getProgressData = async () => {
  const docRef = doc(db, "progress", "jnrws31qnRBia6AFghSe");
    try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data: ", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined
      // set PROGRESS DOC and DATA FOR CURRENT MONTH for this user (0-2023: {1: 0, 2:0, 3:0...})
      // await setDoc and return the data set
      console.log("No such document exists!");
    }
  } catch (error) {
    console.log("Error getting progress data: ", error.message);
    alert("Sorry somthing went wrong. Please try again later.");
  }
}
