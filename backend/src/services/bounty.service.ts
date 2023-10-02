import {Bounty} from "@eosn/devhub-structures/bounty";
import {sha256} from "eosjs-ecc";
import ORM from "../util/orm";

export default class BountyService {

    static async get(slug:string): Promise<Bounty | null> {
        const hash = sha256(slug);
        const bounty = await ORM.get(Bounty.key(hash), Bounty);
        if(!bounty) return null;
        return <Bounty>bounty;
    }

    static async set(bounty:Bounty): Promise<boolean> {
        return await ORM.update(bounty);
    }

    static async create(json:any): Promise<boolean> {
        json.slug = Bounty.titleToSlug(json.localizations['en'].title);
        json.slug_hash = sha256(json.slug);
        return await this.set(new Bounty(json));
    }

    static async getByType(type:number): Promise<Array<Bounty>> {
        return ORM.query(`SELECT * FROM BUCKET_NAME WHERE doc_type = 'bounty' AND type = ${type}`, Bounty)
    }
}
