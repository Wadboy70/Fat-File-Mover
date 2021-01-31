import firebase from "firebase/app";

import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDVmZzfeB6g4symEPgKLKrCvZ2NZ_Dkj1Q",
    authDomain: "fat-file-transfer-70731.firebaseapp.com",
    projectId: "fat-file-transfer-70731",
    storageBucket: "fat-file-transfer-70731.appspot.com",
    messagingSenderId: "859791158093",
    appId: "1:859791158093:web:aeae49849514341d106504",
    measurementId: "G-BY1JP3PTM0"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const storageRef = app.storage().ref();

export const auth = firebase.auth();

export const fileUpload = async (file, name) => {
    const fileRef = storageRef.child(`/${name}`);
    return fileRef.put(file).then(res => res);
};

export const downloadFile = async (path) => {
    return storageRef.child(path).getDownloadURL().then(url => url);
}

export const fileList = () => {
    const listRef = storageRef.child('/');
    return listRef.listAll().then(res => res);
};

export const deleteFile = (path) => {
    const listRef = storageRef.child(path);
    return listRef.delete().then(res => res).catch(err => err);
};