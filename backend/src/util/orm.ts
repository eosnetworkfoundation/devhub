import couchbase, {buildQuery} from "./couchbase";
import fs from "fs";
import path from "path";

let BUCKET:any;
let CLUSTER:any;

const BUCKET_NAME = (<any>process.env).COUCHBASE_BUCKET_NAME || 'devhub';

export default class ORM {

	static async load(){
		const cb = await couchbase(BUCKET_NAME);
		if(!cb) {
			console.error("Could not get couchbase bucket and cluster");
			process.exit(1)
		}
		BUCKET = cb.bucket;
		CLUSTER = cb.cluster;
	}

	static loadBucketManually(bucket:any){
		BUCKET = bucket;
	}

	static async insert(model:any){
		if(!BUCKET) await ORM.load();
		// @ts-ignore
		return BUCKET.insert(model.key(), model).then(() => true).catch(err => {
			console.error('insert error', err, model.key());
			return false;
		});
	}

	static async update(model:any){
		if(!BUCKET) await ORM.load();
		// @ts-ignore
		return BUCKET.upsert(model.key(), model).then(() => true).catch(err => {
			console.error('upsert error', err);
			return false;
		}).then(() => true);
	}

	static async updateRaw(key, data){
		if(!BUCKET) await ORM.load();
		// @ts-ignore
		return BUCKET.upsert(key, data).then(() => true).catch(err => {
			console.error('upsert error', err);
			return false;
		});
	}

	static async get(key:string, Model:any = null){
		if(!BUCKET) await ORM.load();
		// @ts-ignore
		return BUCKET.get(key).then(x => Model ? new Model(x.value) : x.value).catch(err => {
			// console.warn('get error', err);
			return null;
		});
	}

	static async remove(key){
		if(!BUCKET) await ORM.load();
		return BUCKET.remove(key).then(() => true).catch(() => false);
	}

	static async exists(key){
		if(!BUCKET) await ORM.load();
		return BUCKET.exists(key);
	}

	static async query(queryString, model:any = null){
		if(!BUCKET) await ORM.load();
		// Replaces placeholder param.
        try {
			queryString = queryString.replace(/BUCKET_NAME/g, '`'+BUCKET_NAME+'`');

			return CLUSTER.query(queryString, {
				scanConsistency: 'request_plus',
			}).catch(err => {
				console.error(err);
				return null;
			}).then(queryResult => {
				let rows = queryResult.rows;
				if(!rows) return [];
				rows = rows.map(x => x.hasOwnProperty(BUCKET_NAME) ? x[BUCKET_NAME] : x);
				return rows.map(x => model ? new model(x) : x)
			});
		} catch(err) {
			console.error(err);
			return null;
		}
	}

	static async increment(key, value){
		if(!BUCKET) await ORM.load();
		// @ts-ignore
		return BUCKET.counter(key, value, { initial:value });
	}

	static async decrement(key, value){
		if(!BUCKET) await ORM.load();
		return this.increment(key, -value);
	}

	static async clearDatabase(){
		if((<any>process.env).COUCHBASE_HOST !== "couchbase://localhost") return console.error("Cannot flush non local db");
		if(!BUCKET) await ORM.load();
		try {
			await this.query(`DELETE FROM BUCKET_NAME WHERE doc_type != "delete"`);
			return true;
		} catch(err) {
			console.error(err);
			return false;
		}
	}
}
