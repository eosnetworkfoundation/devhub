// import couchbase, {buildQuery} from "./couchbase";
// import fs from "fs";
// import path from "path";
//
// let BUCKET:any;
// let CLUSTER:any;
//
// const BUCKET_NAME = (<any>process.env).COUCHBASE_BUCKET_NAME || 'devhub';
//
// export default class ORM {
//
// 	static async load(){
// 		const cb = await couchbase(BUCKET_NAME);
// 		if(!cb) {
// 			console.error("Could not get couchbase bucket and cluster");
// 			process.exit(1)
// 		}
// 		BUCKET = cb.bucket;
// 		CLUSTER = cb.cluster;
// 	}
//
// 	static loadBucketManually(bucket:any){
// 		BUCKET = bucket;
// 	}
//
// 	static async insert(model:any){
// 		if(!BUCKET) await ORM.load();
// 		// @ts-ignore
// 		return BUCKET.insert(model.key(), model).then(() => true).catch(err => {
// 			console.error('insert error', err, model.key());
// 			return false;
// 		});
// 	}
//
// 	static async update(model:any){
// 		if(!BUCKET) await ORM.load();
// 		// @ts-ignore
// 		return BUCKET.upsert(model.key(), model).then(() => true).catch(err => {
// 			console.error('upsert error', err);
// 			return false;
// 		}).then(() => true);
// 	}
//
// 	static async updateRaw(key, data){
// 		if(!BUCKET) await ORM.load();
// 		// @ts-ignore
// 		return BUCKET.upsert(key, data).then(() => true).catch(err => {
// 			console.error('upsert error', err);
// 			return false;
// 		});
// 	}
//
// 	static async get(key:string, Model:any = null){
// 		if(!BUCKET) await ORM.load();
// 		// @ts-ignore
// 		return BUCKET.get(key).then(x => Model ? new Model(x.value) : x.value).catch(err => {
// 			// console.warn('get error', err);
// 			return null;
// 		});
// 	}
//
// 	static async remove(key){
// 		if(!BUCKET) await ORM.load();
// 		return BUCKET.remove(key).then(() => true).catch(() => false);
// 	}
//
// 	static async exists(key){
// 		if(!BUCKET) await ORM.load();
// 		return BUCKET.exists(key);
// 	}
//
// 	static async query(queryString, model:any = null){
// 		if(!BUCKET) await ORM.load();
// 		// Replaces placeholder param.
//         try {
// 			queryString = queryString.replace(/BUCKET_NAME/g, '`'+BUCKET_NAME+'`');
//
//
// 			return CLUSTER.query(queryString, {
// 				scanConsistency: 'request_plus',
// 				readonly: true,
// 				// timeout: 5000,
// 			}).then(queryResult => {
// 				console.log('queryResult', queryResult);
// 				let rows = queryResult.rows;
// 				if(!rows) return [];
// 				rows = rows.map(x => x.hasOwnProperty(BUCKET_NAME) ? x[BUCKET_NAME] : x);
// 				return rows.map(x => model ? new model(x) : x)
// 			}).catch(err => {
// 				console.error('query error', err, queryString);
// 				return null;
// 			});
// 		} catch(err) {
// 			console.error(err);
// 			return null;
// 		}
// 	}
//
// 	static async increment(key, value){
// 		if(!BUCKET) await ORM.load();
// 		// @ts-ignore
// 		return BUCKET.counter(key, value, { initial:value });
// 	}
//
// 	static async decrement(key, value){
// 		if(!BUCKET) await ORM.load();
// 		return this.increment(key, -value);
// 	}
//
// 	static async clearDatabase(){
// 		if((<any>process.env).COUCHBASE_HOST !== "couchbase://localhost") return console.error("Cannot flush non local db");
// 		if(!BUCKET) await ORM.load();
// 		try {
// 			await this.query(`DELETE FROM BUCKET_NAME WHERE doc_type != "delete"`);
// 			return true;
// 		} catch(err) {
// 			console.error(err);
// 			return false;
// 		}
// 	}
// }

import { FireStore } from "./firebase";

export default class ORM {

	static async clearDatabase(){
		console.error("No clear on firebase yet");
		return null;
	}

	static async upsert(model:any){
		model.updated_at = Date.now();
		return FireStore.set(model.key(), JSON.parse(JSON.stringify(model)));
	}

	static async upsertMany(models:any[]){
		const data:any = {};
		for(const model of models.filter(x => !!x)){
			model.updated_at = Date.now();
			data[model.key()] = JSON.parse(JSON.stringify(model));
		}
		return FireStore.setMany(data);
	}

	static async upsertRaw(key, data){
		if(data.hasOwnProperty('updated_at')) data.updated_at = Date.now();
		return FireStore.set(key, typeof data === 'string' ? JSON.parse(JSON.stringify(data)) : data);
	}

	static async get(key:string, Model:any = null): Promise<any|null> {
		return FireStore.get(key).then(x => {
			if(!x) return null;
			return Model ? new Model(x) : x;
		});
	}

	static async delete(key){
		return FireStore.delete(key);
	}

	static async exists(key){
		return FireStore.exists(key);
	}

	static async query(func:(collection:any) => {}, Model:any = null){
		return FireStore.query(func).then(x => Model ? x.map(y => new Model(y)) : x);
	}
}
