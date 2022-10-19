export enum CourseDifficulty {
    Beginner = 0,
    Intermediate,
    Advanced,
    Expert
}

export class EpisodeQuestion {
    public id:string = "";
    public text:string = "";
    public possible_answers:{ [key:number]:string} = {};

    public constructor(json?:Partial<EpisodeQuestion>) {
        (<any>Object).assign(this, json);
    }
}

export class Episode {
    public id:string = "";
    public title:string = "";
    public description:string = "";
    public questions:Array<EpisodeQuestion> = [];
    public video_url:string = "";
    public resources_url:string|null = null;

    public constructor(json?:Partial<Episode>) {
        (<any>Object).assign(this, json);
        this.questions = this.questions?.map(x => new EpisodeQuestion(x));
    }
}

export class Course {
    public doc_type:string = "course";
    public created_at:number = 0;

    public slug:string = "";
    public slug_hash:string = "";
    public title:string = "";
    public description:string = "";
    public episodes:Array<Episode> = [];
    public difficulty:CourseDifficulty = CourseDifficulty.Beginner;
    public language:string = "en";
    public tags:Array<string> = [];
    public instructor:string = "";
    public thumbnail:string = "";

    public answers:{[question_id:string]:number} = {};

    public constructor(json?:Partial<Course>) {
        (<any>Object).assign(this, json);
        this.episodes = this.episodes?.map(x => new Episode(x));
    }

    static key(slug_hash:string){ return `course::${slug_hash}`; }
    key(){ return Course.key(this.slug_hash); }

    asPublic(){
        const clone = JSON.parse(JSON.stringify(this));
        delete clone.answers;
        return new Course(clone);
    }

}
