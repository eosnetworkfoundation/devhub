export enum BountyType {
    Teach = 0,
    Port,
}

export interface BountyData {
    title:string;
    subtitle:string;
    header_text:string;
    markdown:string;
}

export class Bounty {
    public doc_type:string = "bounty";
    public created_at:number = 0;

    public slug:string = "";
    public slug_hash:string = "";
    public price:number = 0;
    public type:number = BountyType.Teach;
    public localizations:{[lang:string]:BountyData} = {};

    public constructor(json?:Partial<Bounty>) {
        (<any>Object).assign(this, json);
    }

    static key(slug_hash:string){ return `bounty::${slug_hash}`; }
    key(){ return Bounty.key(this.slug_hash); }

    static titleToSlug(title:string){
        return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    }
}
