import {Course, CourseDifficulty} from "@eosn/devhub-structures/course";
import ORM from "../util/orm";
import {CustomError} from "../util/errors";
import {sha256} from 'eosjs-ecc';

const titleToSlug = (title:string) => {
    return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}


// Persisted courses contain their answers.
// Only return public information to external routes.
const safeCourses = (course:Promise<Array<Course>>) =>
    course.then(courses => {
        if(!courses) return [];
        return courses.filter(x => !!x).map(course => course.asPublic())
    });

export default class CourseService {

    static async get(slug_hash:string, safe:boolean = false): Promise<Course | null> {
        const course = await ORM.get(Course.key(slug_hash), Course);
        if(!course) return null;
        return safe ? (<Course>course).asPublic() : <Course>course;
    }

    static async set(course:Course): Promise<boolean> {
        return await ORM.upsert(course);
    }

    static async create(json:any): Promise<Course | CustomError> {
        let course = json;

        if(!course.title || !course.title.length) return new CustomError("Title is required");
        if(!course.description || !course.description.length) return new CustomError("Description is required");
        if(!course.instructor || !course.instructor.length) return new CustomError("Instructor is required");
        if(!course.language || !course.language.length) return new CustomError("Language is required");
        if(isNaN(course.difficulty)) return new CustomError("Difficulty is not a number");
        if(course.difficulty < CourseDifficulty.Beginner || course.difficulty > CourseDifficulty.Expert) return new CustomError("Difficulty is out of range");
        if(!course.episodes || !course.episodes.length) return new CustomError("Episodes is required");
        if(!course.tags.every(x => typeof x === "string")) return new CustomError("Tags must be strings");

        for(let episode of course.episodes){
            if(!episode.title || !episode.title.length) return new CustomError("Episodes must have a title: " + JSON.stringify(episode));
            if(!episode.description || !episode.description.length) return new CustomError("Episodes must have a description: " + JSON.stringify(episode));
            if(!episode.video_url || !episode.video_url.length) return new CustomError("Episodes must have a video url: " + JSON.stringify(episode));
            for(let question of episode.questions){
                if(!question.text || !question.text.length) return new CustomError("Questions must have a text: " + JSON.stringify(question));
                if(!Object.keys(question.possible_answers).length) return new CustomError("Questions must have possible answers: " + JSON.stringify(question));
            }
        }

        const answerKeys = Object.keys(course.answers);
        const questionsCount = course.episodes.reduce((acc, episode) => acc + episode.questions.length, 0);
        if(answerKeys.length !== questionsCount) return new CustomError("There must be an answer for each question");

        course.difficulty = parseInt(course.difficulty.toString());
        course.slug = titleToSlug(course.title);
        course.slug_hash = sha256(course.slug);
        course.created_at = Date.now();
        course.doc_type = "course";

        course = new Course(course);

        const upserted = await this.set(course);
        return upserted ? course : new CustomError("Failed to create course");
    }

    static async getEssential(): Promise<Array<Course>> {
        return [];
        // return safeCourses(ORM.query(collection => collection.find({doc_type: 'course', difficulty: CourseDifficulty.Beginner}), Course));
    }

    static async getPopular(): Promise<Array<Course>> {
        return [];
        // const result = await ORM.query(`SELECT ARRAY_AGG(DISTINCT course_slug_hash) as courses FROM BUCKET_NAME WHERE doc_type = 'course_progress' AND finished = true`);
        // if(!result || !result.length || !result[0].courses || !result[0].courses.length) return [];
        // const course_slug_hashes = result[0].courses;
        // return safeCourses(Promise.all(course_slug_hashes.map(async x => await CourseService.get(x))));
    }

    static getCourses(): Promise<Array<Course>> {

        const sortByDate = (a:Course, b:Course) => {
            if(a.created_at > b.created_at) return -1;
            if(a.created_at < b.created_at) return 1;
            return 0;
        }

        const sortByDifficulty = (a:Course, b:Course) => {
            if(a.difficulty > b.difficulty) return -1;
            if(a.difficulty < b.difficulty) return 1;
            return 0;
        }

        // return safeCourses(ORM.query(`SELECT * FROM BUCKET_NAME WHERE doc_type = 'course'`, Course));
        return safeCourses(ORM.query(collection => collection.where('doc_type', '==', 'course'), Course)).then(courses => {
           return courses.sort(sortByDifficulty);
        });
    }

    static async getContinueWatching(user_id:string): Promise<Array<Course>> {
        // const result = await ORM.query(`SELECT course_slug_hash FROM BUCKET_NAME WHERE doc_type = 'course_progress' AND user_id = '${user_id}' AND finished = false`);
        // if(!result || !result.length || !result[0].courses || !result[0].courses.length) return [];
        // const course_slug_hashes = result.map(x => x.course_slug_hash);
        // return safeCourses(Promise.all(course_slug_hashes.map(async x => await CourseService.get(x))));
        return [];
    }

    static async search(query:string): Promise<Array<Course>> {
        // query = query.toLowerCase().trim();
        // return safeCourses(ORM.query(`SELECT * FROM BUCKET_NAME WHERE doc_type = 'course' AND (LOWER(title) LIKE '%${query}%' OR LOWER(description) LIKE '%${query}%')`, Course));
        return [];
    }

}
