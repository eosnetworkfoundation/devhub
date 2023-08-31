import {Challenge} from "@eosn/devhub-structures/challenge";
import ORM from "../util/orm";

export default class ChallengeService {

    static async get(id:string): Promise<Challenge | null> {
        const challenge = await ORM.get(Challenge.key(id), Challenge);
        if(!challenge) return null;
        return <Challenge>challenge;
    }

    static async set(challenge:Challenge): Promise<boolean> {
        return await ORM.upsert(challenge);
    }

    static async create(json:any): Promise<boolean> {
        const challenge = new Challenge(json);
        challenge.created_at = Date.now();

        if(!challenge.id) {
            console.error('ChallengeService.create() missing id', challenge);
            return false;
        }

        return await this.set(challenge);
    }

    static async remove(id:string): Promise<boolean> {
        return await ORM.delete(Challenge.key(id));
    }

    static async getAll(): Promise<Array<Challenge>> {
        // return ORM.query(`SELECT * FROM BUCKET_NAME WHERE doc_type = 'challenge'`, Challenge)
        return ORM.query(collection => collection.where('doc_type', '==', 'challenge'), Challenge);
    }
}
