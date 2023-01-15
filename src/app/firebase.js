import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, addDoc, setDoc, updateDoc } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

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
    if (error.code === "auth/email-already-exists") {
      alert("A user with this email has already been registerd. Please log in or register with a different email.");
    } else if (error.code === "auth/invalid-email") {
      alert("Please use a valid email address.");
    } else if (error.code === "auth/invalid-password") {
      alert("The password you have enterd is too short. Please use a longer one.");
    } else {
      alert("Sorry, something went wrong. Please try again later.");
    }
    console.log("Error registering user.", error);
  }
}

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { uid } = userCredential.user;
    console.log("uid: ", uid);
    return uid;
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      alert("Wrong password. Please try again.");
    } else if (error.code === "auth/user-not-found") {
      alert("A user with this email is not registerd. Please register.");
    } else {
      alert("Sorry, something went wrong. Please try again later.");
      console.log("Error logging in user: ", error.code);
    }
  }
}

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Error signing out user.");
  }
}

//[`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`]: []

const setTodosDoc = async (userId) => {
  try {
    await setDoc(doc(db, "todos", userId), {});
    return;
  } catch (error) {
    console.log("Error setting todos doc: ", error);
  }
}

// fire when user successfully logs in (need user uid)
export const getTodos = async (userId) => {
  const docRef = doc(db, "todos", userId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data: ", docSnap.data());
      return docSnap.data();
    } else {

      await setTodosDoc(userId);

      return {};
    }
  } catch (error) {
    console.log("Error getting todos: ", error.message);
    alert("Sorry somthing went wrong. Please try again later.");
  }
}

export const updateTodos = async (userId, currentTodosObject) => {
  const docRef = doc(db, "todos", userId);
  const todaysDate = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
  try {
    await updateDoc(docRef, {
      [todaysDate]: {...currentTodosObject}
    });
    return;
  } catch (error) {
    console.log("Error updating todos doc: ", error);
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
