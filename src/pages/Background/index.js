import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDQZ-f8JPHd2z50zazSmC5rDDivSwJ8Uls",
    authDomain: "document-72192.firebaseapp.com",
    databaseURL: "https://document-72192-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "document-72192",
    storageBucket: "document-72192.appspot.com",
    messagingSenderId: "1090217696665",
    appId: "1:1090217696665:web:4df045e130005892388708"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db);
const auth = getAuth(app);
const data = { error: false };

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const command = request.command;
        if (command === 'isLoggedIn') {
            isLoggedIn(request, sender, sendResponse);
        }
        if (command === 'login') {
            login(request, sender, sendResponse);
        }
        if (command === 'save') {
            save(request, sender, sendResponse);
        }
        if (command === 'register') {
            register(request, sender, sendResponse);
        }

        return true;
    }
);


const isLoggedIn = (request, sender, sendResponse) => {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            data.loggedIn = true;
            data.user = user;
        } else {
            data.loggedIn = false;
        }
        sendResponse(data);
    });
}

const login = (request, sender, sendResponse) => {
    signInWithEmailAndPassword(auth, request.email, request.password)
        .then((result) => {
            data.user = result.user;
            data.isLoggedIn = true;
            sendResponse(data);
        })
        .catch((error) => {
            data.error = error;
            data.isLoggedIn = false;
            sendResponse(data);
        });
}

const save = (request, sender, sendResponse) => {
    const data = {};
    const d = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const path = 'users/' + auth.currentUser.uid + '/' + d.getFullYear() + '/' + months[d.getMonth()] + '/' + d.getDate();
    set(ref(db, path), request.data);
    sendResponse(data);
}

const register = (request, sender, sendResponse) => {
    createUserWithEmailAndPassword(auth, request.email, request.password)
        .then(result => {
            sendResponse({ error: false, result: result });
        })
        .catch(error => {
            sendResponse({ error: error });
        })
}