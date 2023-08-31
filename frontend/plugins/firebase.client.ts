import { initializeApp } from "firebase/app";
import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider
} from "firebase/auth";

const getCachedToken = () => {
    return localStorage.getItem('token');
}

const setCachedToken = (token: any) => {
    if(!token) return localStorage.removeItem('token');
    localStorage.setItem('token', token);
}

const firebaseConfig = {
    apiKey: "AIzaSyCDX0UHYrwxwqn7OaXYMJWJb5oGXCTsj0U",
    authDomain: "learn-portal-8da89.firebaseapp.com",
    projectId: "learn-portal-8da89",
    storageBucket: "learn-portal-8da89.appspot.com",
    messagingSenderId: "154432321575",
    appId: "1:154432321575:web:d90b3dc6941ded14a4b602"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const getToken = async () => {
    return auth.currentUser?.getIdToken(true);
}

export class FirebaseClient {
    private NUXT_CONTEXT:any = null;
    public isLoggedIn:boolean = false;
    public lastToken:any = null;

    constructor(context:any) {
        this.NUXT_CONTEXT = context;

        auth.onAuthStateChanged(async (user) => {
            this.NUXT_CONTEXT.store.dispatch('incrementAuthStateNonce');
            this.isLoggedIn = !!user;
        });
    }

    async getNewToken() {
        return getToken().then((token) => {
            this.lastToken = token;
            setCachedToken(token);
        }).catch((error) => {
            console.error('error getting token', error);
        });
    }

    async finalizeLogin(promise:any){
        return promise.then(async (result: any) => {
            return true;
        }).catch((error: any) => {
            // TODO: Error popup
            const errorCode = error.code;
            const errorMessage = error.message;

            if(errorCode === 'auth/account-exists-with-different-credential') {
                //TODO:
            }

            if(errorCode === 'auth/cancelled-popup-request') {
                // swallowing this as it gets eaten by the user closing the popup and lags behind
                // due to browser limitations
                return false;
            }

            console.error('error', errorCode, errorMessage);
            return false;
        });
    }

    async handleOAuthSignin(provider: any) {
        return this.finalizeLogin(signInWithPopup(auth, provider));
    }
    signInWithGitHub() {
        return this.handleOAuthSignin(githubProvider);
    }

    signInWithGoogle() {
        return this.handleOAuthSignin(googleProvider);
    }

    async signOutUser() {
        setCachedToken(null);
        this.NUXT_CONTEXT.store.dispatch('setUser', null);
        return signOut(auth);
    }
}

export default (context, inject) => {
    inject('firebase', new FirebaseClient(context));
}
