import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    doc,
    getFirestore,
    setDoc
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyB_ExX652-rxbFMgbf7DrruLmQC3lBFu1Y",
    authDomain: "netflix-clone-38bb9.firebaseapp.com",
    projectId: "netflix-clone-38bb9",
    storageBucket: "netflix-clone-38bb9.appspot.com",
    messagingSenderId: "531072888986",
    appId: "1:531072888986:web:501c86d88759ae58c7ef23"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
};

const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
};

export { auth, db, login, signUp, logout };
