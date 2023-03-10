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

// Todos 

const setTodosDoc = async (userId) => {
  try {
    await setDoc(doc(db, "todos", userId), {});
    return;
  } catch (error) {
    console.log("Error setting todos doc: ", error);
  }
}


export const getTodos = async (userId) => {
  const docRef = doc(db, "todos", userId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {

      await setTodosDoc(userId);

      return {};
    }
  } catch (error) {
    console.log("Error getting todos.");
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
    console.log("Error updating todos doc.");
  }
}

export const scheduleTodos = async (userId, todosObject, date) => {
  const docRef = doc(db, "todos", userId);
  try {
    await updateDoc(docRef, {
      [date]: {...todosObject}
    });
    return;
  } catch (error) {
    console.log("Error scheduling todos: ", error);
  }
}

const setProgressDoc = async (id) => {
  const docRef = doc(db, "progress", id);
  try {
    await setDoc(docRef, {});
    return;
  } catch (error) {
    console.log("Error setting progress doc.");
  }
}

export const getProgressData = async (userId) => {
  const docRef = doc(db, "progress", userId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document exists!");
      await setProgressDoc(userId);
      return {};
    }
  } catch (error) {
    console.log("Error getting progress data: ", error.message);
  }
}

export const updateProgress = async (userId, percentage) => {
  if (!userId) return;

  const docRef = doc(db, "progress", userId);
  const monthYearKey = `${new Date().getMonth()}-${new Date().getFullYear()}`;
  const date = `${new Date().getDate()}`;
  const progressData = await getProgressData(userId);

  if (!progressData[monthYearKey] || !Object.keys(progressData[monthYearKey]).length) {
    try {
      await updateDoc(docRef, {
        [monthYearKey]: {[date]: percentage}
      });
      return;
    } catch (error) {
      console.log("Error updating progress.");
    }
  } else {
    // update month-year object with percentage for todays date
    const updatedPercentages = {...progressData[monthYearKey], [date]: percentage};
    try {
      await updateDoc(docRef, {
        [monthYearKey]: {...updatedPercentages}
      });
      return;
    } catch (error) {
      console.log("Error updating progress.");
    }
  }
}
