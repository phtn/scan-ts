"use client";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: process.env.NEXT_PUBLIC_F_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_F_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_F_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_F_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_F_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_F_APPID,
  measurementId: process.env.NEXT_PUBLIC_F_MEASUREMENTID,
};

// get config
export const getConfig = () => config;

// Initialize Firebase
export const app = initializeApp(config);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
