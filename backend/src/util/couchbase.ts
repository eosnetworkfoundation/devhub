require('dotenv').config();

const COUCHBASE_HOST =          (<any>process.env).COUCHBASE_HOST;
const COUCHBASE_USERNAME =      (<any>process.env).COUCHBASE_USERNAME;
const COUCHBASE_PASSWORD =      (<any>process.env).COUCHBASE_PASSWORD;

const couchbase = require('couchbase');

export const n1ql = couchbase.N1qlQuery;
export const n1qlOptions = {scan_consistency:"request_plus"};
export const buildQuery = (query:string) => {
    const statement = n1ql.fromString(query);
    statement.consistency(n1ql.Consistency.REQUEST_PLUS);
    return statement;
};

export default async (bucketName:string) => {
    try {
        const cluster = await couchbase.connect(
            COUCHBASE_HOST,
            {
                username: COUCHBASE_USERNAME,
                password: COUCHBASE_PASSWORD,
            })
        const bucket = cluster.bucket(bucketName).defaultCollection();
        return { bucket, cluster };
    } catch (err) {
        console.error("Couchbase error", JSON.stringify(err));
        return null;
    }
};
