export enum CHALLENGE_TYPE {
    ENGAGEMENT = "engagement",
    RESEARCH = "research",
    DEVELOPMENT = "development",
}

export class Challenge {
    public doc_type:string = "challenge";
    public created_at:number = 0;

    // Static data
    public id:string = "";
    public title:string = "";
    public description:string = "";
    public reward:number = 0;
    public type:CHALLENGE_TYPE = CHALLENGE_TYPE.ENGAGEMENT;

    public constructor(json?:Partial<Challenge>) {
        (<any>Object).assign(this, json);
    }

    static key(id:string){ return `challenge::${id}`; }
    key(){ return Challenge.key(this.id); }
}
