import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCnfOeiIloZhOrZ2-0lqOkY_OcCTk9VcD0",
  authDomain: "react-crud-829f9.firebaseapp.com",
  projectId: "react-crud-829f9",
  storageBucket: "react-crud-829f9.appspot.com",
  messagingSenderId: "777472054287",
  appId: "1:777472054287:web:183b168f141bb048253f7a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
