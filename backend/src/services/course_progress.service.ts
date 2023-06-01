import {Course} from "@eosn/devhub-structures/course";
import {CourseProgress} from "@eosn/devhub-structures/course_progress";
import Errors, {CustomError} from "../util/errors";
import ORM from "../util/orm";
import CourseService from "./course.service";


export default class CourseProgressService {

    static async get(course_slug_hash:string, user_id:string): Promise<CourseProgress | null> {
        const progress = await ORM.get(CourseProgress.key(course_slug_hash, user_id), CourseProgress);
        if(!progress) return null;
        return <CourseProgress>progress;
    }

    static async set(progress:CourseProgress): Promise<boolean> {
        return await ORM.update(progress);
    }

    static async getAllForUser(user_id:string): Promise<Array<CourseProgress>> {
        const progresses = await ORM.query(`SELECT * FROM BUCKET_NAME WHERE doc_type = 'course_progress' AND user_id = '${user_id}'`, CourseProgress);
        await Promise.all(progresses.map(async progress => {
            progress.course = await CourseService.get(progress.course_slug_hash, true);
        }));

        return progresses;
    }

    static async getOrCreate(course_slug_hash:string, user_id:string): Promise<CourseProgress> {
        const progress = await this.get(course_slug_hash, user_id);
        if(!progress) return new CourseProgress({ course_slug_hash, user_id, created_at:+new Date() });
        return progress;
    }

    static async setAnswers(course_slug_hash:string, user_id:string, answers:{[question_id:string]:number}): Promise<CourseProgress | CustomError> {
        const course = await CourseService.get(course_slug_hash);
        if(!course) return Errors.cantFindCourse();
        let progress:CourseProgress = await this.getOrCreate(course_slug_hash, user_id);
        Object.keys(answers).map(question_id => {
            // @ts-ignore
            progress.answers[question_id] = answers[question_id];
        })
        return await this.set(progress) ? progress : Errors.databaseError();
    }

    static async setTimestamp(course_slug_hash:string, user_id:string, timestamp:number): Promise<CourseProgress | CustomError> {
        const course = await CourseService.get(course_slug_hash);
        if(!course) return Errors.cantFindCourse();
        let progress:CourseProgress = await this.getOrCreate(course_slug_hash, user_id);
        progress.last_episode_timestamp = timestamp;
        return await this.set(progress) ? progress : Errors.databaseError();
    }

    static async finalize(course_slug_hash:string, user_id:string): Promise<CourseProgress | CustomError> {
        const course:Course|null = await CourseService.get(course_slug_hash);
        if(!course) return Errors.cantFindCourse();
        const progress = await this.get(course_slug_hash, user_id);
        if(!progress) return Errors.cantFindCourseProgress();

        const questions_count = Object.keys(course.answers).length;
        const answers_count = Object.keys(progress.answers).length;
        if(answers_count < questions_count) return Errors.courseNotFinishedYet();

        let correct_answers_count = 0;
        for(let question_id in course.answers) {
            if(course.answers[question_id] == progress.answers[question_id]){
                correct_answers_count++;
            }
        }

        progress.last_episode_timestamp = 0;
        progress.score = parseFloat((correct_answers_count / questions_count).toString()).toFixed(1);
        progress.finished = true;

        return (await this.set(progress)) ? progress : Errors.databaseError();
    }

    static async getBadAnswers(course_slug_hash:string, user_id:string): Promise<Array<{ question:string, given_answer:number, correct_answer: number }> | CustomError> {
        console.log('slug hash', course_slug_hash);
        const course:Course|null = await CourseService.get(course_slug_hash);
        if(!course) return Errors.cantFindCourse();

        const progress = await this.get(course_slug_hash, user_id);
        if(!progress) return Errors.cantFindCourseProgress();
        console.log(course.answers, progress.answers)

        const bad_answers: Array<{ question:string, given_answer:number, correct_answer: number }> = [];
        for(let question_id in course.answers) {

            if(course.answers[question_id] != progress.answers[question_id]){
                bad_answers.push({
                    question: question_id,
                    given_answer: progress.answers[question_id],
                    correct_answer: course.answers[question_id]
                });
            }
        }

        return bad_answers;
    }

    static async getAllFinishedProgresses(): Promise<number> {
        const progresses = await ORM.query(`SELECT COUNT(*) FROM BUCKET_NAME WHERE doc_type = 'course_progress' AND finished = true`);
        if(!progresses) return 0;
        return progresses[0]['$1'];
    }

}
