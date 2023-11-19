// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, set, ref, get, child } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getAuth,GoogleAuthProvider, signInWithRedirect, getRedirectResult, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const { initializeApp: initializeAdminApp } = ('firebase-admin/app');
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0cj2nhCWU6kjWRRox9h2PqQmDYbYUX5c",
    authDomain: "gameverse-9c15b.firebaseapp.com",
    databaseURL: "https://gameverse-9c15b-default-rtdb.firebaseio.com",
    projectId: "gameverse-9c15b",
    storageBucket: "gameverse-9c15b.appspot.com",
    messagingSenderId: "200183330100",
    appId: "1:200183330100:web:64398e87f58ba07ba6e161"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize variables
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const database =getDatabase();
const dbref = ref(database);

//get input fields
let fnameInput = document.getElementById('fName');
let lnameInput = document.getElementById('lName');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let confirmpasswordInput = document.getElementById('confirm-password');

//register with google account
document.getElementById('google-btn').addEventListener('click',(e)=>{
    signInWithRedirect(auth, provider);

    getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // name

    alert(user.displayName);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})


// Register User
document.getElementById('register-btn').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const fname = document.getElementById('fname').value;
            const lname = document.getElementById('lname').value;

            // Store user information in the database
            // Replace the following code with your database logic
            const userRef = firebase.database().ref('users/' + user.uid);
            userRef.set({
                firstName: fname,
                lastName: lname,
                email: email
            });

            console.log('Registration successful for user: ', user);
            // Redirect to another page or perform other actions
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Registration error:', errorCode, errorMessage);
        });
});

// Login User
document.getElementById('login-btn').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Login successful for user: ', user);
            // Redirect to another page or perform other actions
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Login error:', errorCode, errorMessage);
        });
});




//--------------------------------------

        // Your Twitter API key and callback URL
        const twitterApiKey = '9JcfiiBM9C8Z5fjcgUal3ZMEm';
        const callbackUrl = 'https://gameverse-9c15b.firebaseapp.com/__/auth/handlergame';

        // Attach an event listener to the Twitter sign-in button
        document.getElementById('twitterSignInButton').addEventListener('click', () => {
            // Open a new window for the Twitter authentication
            const twitterAuthUrl = `https://api.twitter.com/oauth/authenticate?client_id=${twitterApiKey}&redirect_uri=${callbackUrl}`;
            const popupWindow = window.open(twitterAuthUrl, 'Twitter Sign-In', 'width=600,height=400');

            // Check for OAuth callback in the popup window
            const oauthCallback = () => {
                const url = popupWindow.location.href;

                if (url.indexOf(callbackUrl) !== -1) {
                    // Parse the URL to get the OAuth token and verifier
                    const urlParams = new URLSearchParams(url.split('?')[1]);
                    const oauthToken = urlParams.get('oauth_token');
                    const oauthVerifier = urlParams.get('oauth_verifier');

                    // Close the popup window
                    popupWindow.close();

                    // You can now use the OAuth token and verifier to complete the Twitter sign-in process on your server.
                    // Send these values to your server for verification and user authentication.
                }
            };

            // Poll for changes in the popup window's URL
            const intervalId = setInterval(oauthCallback, 1000);

            // Close the interval when the popup window is closed
            popupWindow.onbeforeunload = () => {
                clearInterval(intervalId);
            };
        });
    
        const db = firebase.firestore();
        db.collection("gameverse products").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // Access data using doc.data()
              console.log(doc.id, " => ", doc.data());
            });
          });
          