import UserService from "../src/services/user.service";
import CourseService from "../src/services/course.service";
import CourseProgressService from "../src/services/course_progress.service";
import { assert } from 'chai';

import ORM from "../src/util/orm";
import {User} from "@eosn/devhub-structures/user";
import {Course} from "@eosn/devhub-structures/course";
import {CourseProgress} from "@eosn/devhub-structures/course_progress";
import {CustomError} from "../src/util/errors";

let user;
let course;

describe('Course progress service tests', () => {
    it('should clear the database', async () => {
        await ORM.clearDatabase();
    });

    it('should create a user to use', async () => {
        user = await UserService.create({
            key: process.env.USER_CREATE_KEY,
            user:{
                email: 'test@test.com',
                name: 'Test User',
                user_id: '12345'
            }
        });
        assert(user instanceof User, "Did not create a user");
    });

    it('should be able to create a course', async () => {
        course = new Course({
            title: 'Test Course',
            difficulty: 0,
            episodes:[
                {
                    id: 'episodeid',
                    title: 'Test Episode',
                    description: 'Test Episode Description',
                    questions:[
                        {
                            id: 'questionid',
                            text: 'Test Question',
                            possible_answers: {0: 'test question 1', 1: 'test question 2'},
                        },
                        {
                            id: 'questionid2',
                            text: 'Test Question',
                            possible_answers: {0: 'test question 1', 1: 'test question 2'},
                        }
                    ],
                    video_url: 'https://test.com',
                    resources_url: 'https://test.com',
                }
            ],
            answers: {'questionid':0, 'questionid2':1},
        });
        const created = await CourseService.set(course);
        assert(created, "Did not set course");

        const fetched = await CourseService.get(course.slug_hash);
        assert(fetched instanceof Course, "Did not get course");
        assert(fetched.title === course.title, "Did not get correct course");
    });

    it('should be able to log progress timestamps on a course', async () => {
        const progress = await CourseProgressService.setTimestamp(course.slug_hash, user.id, 12345);
        assert(progress instanceof CourseProgress, "Did not set progress");
        assert(progress.last_episode_timestamp === 12345, "Did not set correct timestamp");

        const persisted = await CourseProgressService.get(course.slug_hash, user.id);
        assert(persisted instanceof CourseProgress, "Did not get progress");
        assert(persisted.course_slug_hash === course.slug_hash, "Persisted course id did not match");
        assert(persisted.user_id === user.id, "Persisted progress did not have correct user");
        assert(persisted.last_episode_timestamp === 12345, "Did not get correct timestamp");
    });

    it('should be able to set answers', async () => {
        const progress = await CourseProgressService.setAnswers(course.slug_hash, user.id, {['questionid']: 0});
        assert(progress instanceof CourseProgress, "Did not set progress");
        assert(progress.course_slug_hash === course.slug_hash, "Persisted course id did not match");
        assert(progress.user_id === user.id, "Persisted progress did not have correct user");
        assert((<any>progress.answers)['questionid'] === 0, "Did not set correct question id");
    });

    it('should NOT be able to finalize before all answers are given', async () => {
        const finished = await CourseProgressService.finalize(course.slug_hash, user.id);
        assert(finished instanceof CustomError, "Did not throw error");
        assert(finished.error_msg === "course_still_in_progress", "Did not throw correct error");
    });

    it('should be able to set the final answers', async () => {
        const progress = await CourseProgressService.setAnswers(course.slug_hash, user.id, {['questionid2']: 0});
        assert(progress instanceof CourseProgress, "Did not set progress");
        assert((<any>progress.answers)['questionid2'] === 0, "Did not set correct question id");
    });

    it('should now be able to finalize after all answers are given', async () => {
        const finished = await CourseProgressService.finalize(course.slug_hash, user.id);
        assert(finished instanceof CourseProgress, "Did not finalize progress");
        assert(finished.score === "0.5", "Did not set correct score");
        assert(finished.last_episode_timestamp === 0, "Did not clear timestamp");
    });

});
