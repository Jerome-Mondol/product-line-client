import { axiosInstance } from "@/app/axios";
import { auth } from "@/app/firebase.init.js";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createUserInDB } from "./userOperation";

const provider = new GoogleAuthProvider();


const setJWT = async (userCred) => {
    try {
        const { uid, email } = userCred.user;

        const res = await axiosInstance.post('/jwt',
            { uid, email },
            { withCredentials: true }
        )
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}

const removeJWT = async () => {
    try {
        const res = await axiosInstance.post('/users/logout',
            { },
            { withCredentials: true }
        )

        return res.data;
    }
    catch(err) {
        console.log(err.message);
    }
} 

export const signin = async (userName, email, password) => {
    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: userName, });
        await setJWT(userCred);
        await createUserInDB(userCred);
        return userCred.user;
    }
    catch (err) {
        console.log(err.message);
    }
}

export const login = async (email, password) => {
    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        await setJWT(userCred);

        return userCred.user;
    }
    catch (err) {
        console.log(err.message);
    }
    
}

export const googleSignin = async () => {
    try {
        const userCred = await signInWithPopup(auth, provider);
        await setJWT(userCred)
        await createUserInDB(userCred)
        return userCred.user;
    } 
    catch (err) {
        console.log(err.message);
    }
}

export const logOut = async () => {
    try {
        signOut(auth);
        const JWTStatus = await removeJWT();
        console.log(JWTStatus);
    }
    catch(err) {
        console.log(err.message)
    }
}