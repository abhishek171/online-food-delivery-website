
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "otp-project-5e71f.firebaseapp.com",
  projectId: "otp-project-5e71f",
  storageBucket: "otp-project-5e71f.appspot.com",
  messagingSenderId: "messaiging_id",
  appId: "appId",
  measurementId: "measurement_id"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

