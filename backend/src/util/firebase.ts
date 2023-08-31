require('dotenv').config();

import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const firebaseConfig = require('../../../sensitive/firebase.json');

let initialized = false;
let db;

const initialize = () => {
    initialized = true;
    initializeApp({
        // on google cloud
        // credential: applicationDefault(),
        // locally
        // @ts-ignore
        credential: cert(firebaseConfig)
    });

    db = getFirestore();
}

if(!initialized) initialize();

const collectionName = () => {
    return process.env.FIRESTORE_COLLECTION_NAME || "test-db";
}

export class FireAuth {

    static async decodeToken(token: string): Promise<any> {
        return getAuth().verifyIdToken(token).catch(error => {
            console.error('error', error);
            if(error.code === 'auth/id-token-expired') return "token_expired";
            return null;
        });
    }


}

export class FireStore {

    static async get(index: string): Promise<any> {
        try {
            const doc = await db.collection(collectionName()).doc(index).get();
            return doc.data();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async set(index: string, data: any): Promise<boolean> {
        try {
            const write = await db.collection(collectionName()).doc(index).set(data);
            return !!write && !!write.writeTime;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static async setMany(data:Array<{[key:string]:any}>): Promise<boolean> {
        try {
            const batch = db.batch();
            for(const key in data){
                const ref = db.collection(collectionName()).doc(key);
                batch.set(ref, data[key]);
            }
            const write = await batch.commit();
            return !!write && write.length > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static async delete(index: string): Promise<boolean> {
        try {
            const write = await db.collection(collectionName()).doc(index).delete();
            return !!write && !!write.writeTime;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static async exists(index: string): Promise<boolean> {
        try {
            const doc = await db.collection(collectionName()).doc(index).get();
            return doc.exists;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // this doesn't cover OR queries: https://firebase.google.com/docs/firestore/query-data/queries
    static async query(func:(collection:any) => {}): Promise<any> {
        try {
            const preparedQuery:any = func(db.collection(collectionName()));
            const query = await preparedQuery.get();
            return query.docs.map((doc:any) => doc.data());
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
