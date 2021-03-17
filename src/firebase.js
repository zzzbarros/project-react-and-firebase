import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

    let firebaseConfig = {
        apiKey: "AIzaSyDO1qpMMZbava2edAOV_LZCFp1yDQlnQi8",
        authDomain: "project-firebase-c495f.firebaseapp.com",
        databaseURL: "https://project-firebase-c495f-default-rtdb.firebaseio.com",
        projectId: "project-firebase-c495f",
        storageBucket: "project-firebase-c495f.appspot.com",
        messagingSenderId: "900099393463",
        appId: "1:900099393463:web:6ec64de67f2a814b82ca32"
    };

class Firebase {
    constructor(){
        app.initializeApp(firebaseConfig);
        
        //referenciando a database para acessar em outros locais.
        this.app = app.database();
        this.storage = app.storage();
    }

    login(email,password){
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout(){
        return app.auth().signOut();
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isInitialized(){
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    getCurrentUid() {
        return app.auth().currentUser && app.auth().currentUser.uid
    }

    async getUserName(callback) {
        if(!app.auth().currentUser){
            return null;
        }
        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid)
        .once('value').then(callback);
    }
}

export default new Firebase();