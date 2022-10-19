export class CourseProgress {
    public doc_type:string = "course_progress";
    public created_at:number = 0;

    public course_slug_hash:string = "";
    public user_id:string = "";
    public last_episode_timestamp:number = 0;
    public answers:{ [question_id:string]:number } = {};

    public finished:boolean = false;
    public score:string = "0";

    public constructor(json?:Partial<CourseProgress>) {
        (<any>Object).assign(this, json);
    }

    static key(course_slug_hash:string, user_id:string){ return `progress::${course_slug_hash}::${user_id}`; }
    key(){ return CourseProgress.key(this.course_slug_hash, this.user_id); }
}
