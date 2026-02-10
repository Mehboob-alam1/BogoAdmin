// import {initializeApp} from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyB8SnFFYtnYCAQBd-pN3uv-cvWkjQKkYHQ",
//   authDomain: "bogo-b945d.firebaseapp.com",
//   projectId: "bogo-b945d",
//   storageBucket: "bogo-b945d.firebasestorage.app",
//   messagingSenderId: "630536046058",
//   appId: "1:630536046058:web:1dc01c5cfb0c300d451e93",
//   databaseURL: "https://bogo-b945d-default-rtdb.firebaseio.com"
// };

// export const app = initializeApp(firebaseConfig);






import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBnkLnKl35CsuRECw4UcCCrt_OwwCGiZbE",
  authDomain: "bogo-59914.firebaseapp.com",
  databaseURL: "https://bogo-59914-default-rtdb.firebaseio.com",
  projectId: "bogo-59914",
  storageBucket: "bogo-59914.firebasestorage.app",
  messagingSenderId: "212456857854",
  appId: "1:212456857854:web:1a5b4487d43e64e56945af",
  measurementId: "G-2Z30H72GZF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
