import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDkivxfPUxjRbA99ISyKJtMGdw442cy3lo",
    authDomain: "teacherapp-bbcbf.firebaseapp.com",
    projectId: "teacherapp-bbcbf",
    storageBucket: "teacherapp-bbcbf.appspot.com",
    messagingSenderId: "239469776659",
    appId: "1:239469776659:web:40fe3238a8b60cebd894e6"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

const signInToGetIDToken = async () => {
    const response = await signInWithPopup(auth, provider);
    const idToken = await response.user.getIdToken();
    return idToken;
}

export { signInToGetIDToken }