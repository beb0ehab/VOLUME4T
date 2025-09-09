import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// يجب أن تضع نفس إعدادات مشروعك هنا
const firebaseConfig = {
    apiKey: "AIzaSyBkajwsO5ME11NravlECLJSlk4GN0xGbGE",
    authDomain: "sco4mfortelegram.firebaseapp.com",
    projectId: "sco4mfortelegram",
    storageBucket: "sco4mfortelegram.appspot.com",
    messagingSenderId: "72437321483",
    appId: "1:72437321483:web:e89c4ff409f9c477605c0e",
    measurementId: "G-0BZWRPSB76"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const protectPage = (callback) => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const adminDocRef = doc(db, "admins", user.uid);
                const adminDocSnap = await getDoc(adminDocRef);
                if (adminDocSnap.exists()) {
                    // User is an admin, execute the callback function
                    // which contains the page-specific logic.
                    if (callback) callback(user);
                } else {
                    // User is logged in but not an admin, redirect.
                    console.log("Access denied. User is not an admin.");
                    window.location.href = './login.html';
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
                window.location.href = './login.html';
            }
        } else {
            // User is not logged in, redirect.
            console.log("Access denied. User not logged in.");
            window.location.href = './login.html';
        }
    });
};
