import CourseService from "../src/services/course.service";
import { assert } from 'chai';

import {Course, CourseDifficulty} from "@eosn/devhub-structures/course";
import {CourseProgress} from "@eosn/devhub-structures/course_progress";
import ORM from "../src/util/orm";
import CourseProgressService from "../src/services/course_progress.service";
import {sha256} from 'eosjs-ecc';
import {Bounty} from "@eosn/devhub-structures/bounty";


describe('Course service tests', () => {
    it('should clear the database', async () => {
        await ORM.clearDatabase();
    });

    it('should be able to create a set of courses', async () => {
        let id = 0;
        const createCourse = async () => {
            id++;
            const course = new Course({
                title: `Test Course #${id}`,
                description: id === 4 ? 'Test Course Description' : 'Not test description',
                instructor: 'Test Instructor',
                difficulty: id < 3 ? CourseDifficulty.Beginner
                    : id < 6 ? CourseDifficulty.Intermediate
                    : id < 9 ? CourseDifficulty.Advanced
                    : CourseDifficulty.Expert,
                episodes:[
                    {
                        id: `${id}-1`,
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
                        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        resources_url: 'https://test.com',
                    }
                ],
                answers: {'questionid':0, 'questionid2':1},
            });
            const created = await CourseService.create(course);
            assert(created instanceof Course, "Did not set course");

            const fetched = await CourseService.get(created.slug_hash);
            assert(fetched instanceof Course, "Did not get course");
            assert(fetched.title === course.title, "Did not get correct course");
            assert(fetched.slug === Bounty.titleToSlug(fetched.title), "Did not get correct title slug");
            assert(fetched.slug_hash === sha256(fetched.slug), "Did not get correct slug hash");
        }

        for(let i = 0; i < 12; i++) await createCourse();
    });

    it('should be able to get essential (beginner) courses', async () => {
        const courses = await CourseService.getEssential();
        assert(courses.length > 0, "Did not get any courses");
        assert(courses.every(x => x.difficulty === CourseDifficulty.Beginner), "Did not get beginner courses");
    });

    it('should be able to get popular courses', async () => {
        for(let i = 1; i <= 12; i++) {
            const courseProgress = new CourseProgress({
                user_id: '12345',
                course_slug_hash: sha256(Bounty.titleToSlug(`Test Course #${i}`)),
                finished: i % 4 === 0,
            });
            await CourseProgressService.set(courseProgress);
        }
        const courses = (await CourseService.getPopular()).sort((a, b) => a.difficulty - b.difficulty);
        assert(courses.length === 3, "Did not get any courses");
        assert(courses[0].difficulty === CourseDifficulty.Intermediate, "Did not get intermediate course");
        assert(courses[1].difficulty === CourseDifficulty.Advanced, "Did not get advanced course");
        assert(courses[2].difficulty === CourseDifficulty.Expert, "Did not get expert course");
    });

    it('should be able to get all courses', async () => {
        const courses = await CourseService.getCourses();
        assert(courses.length === 12, "Did not get all courses");
    });

    it('should be able to get continue watching courses', async () => {
        const courses = await CourseService.getContinueWatching('12345');
        assert(courses.length === 9, "Did not get all continue watching courses");
    });

    it('should be able to search courses', async () => {
        const a = await CourseService.search('Course Description');
        assert(a.length === 1, "Did not find correct number of courses (description)");
        const b = await CourseService.search('#5');
        assert(b.length === 1, "Did not find correct number of courses (title)");
        const c = await CourseService.search('xyz');
        assert(c.length === 0, "found courses when it should not have");
    });

    it('should create some fake courses', async () => {
        const course = new Course({
            title: `Blockchain Basics`,
            description: 'Learn all about the basics of blockchain development.',
            instructor: 'Test Instructor',
            difficulty: CourseDifficulty.Beginner,
            episodes:[
                {
                    id: `what-is-a-blockchain`,
                    title: 'What is a Blockchain?',
                    description: "You can't understand everything else without this basic concept.",
                    questions:[
                        {
                            id: 'blockchain-a',
                            text: 'What makes the chain safe?',
                            possible_answers: {0: 'The government', 1: 'The community', 2: 'Mathematics'},
                        },
                        {
                            id: 'blockchain-b',
                            text: "What is a hash?",
                            possible_answers: {0: 'A breakfast food', 1: 'A one-way data validator', 2: 'A way to make a number negative'},
                        }
                    ],
                    video_url: 'https://www.youtube.com/watch?v=E3Tx2DseLGE',
                    resources_url: 'https://test.com',
                },
                {
                    id: `public-keys`,
                    title: 'Public & Private Keys',
                    description: 'Learn all about what keys are and how they work.',
                    questions:[
                        {
                            id: 'keys-a',
                            text: 'Which key is used to sign a transaction?',
                            possible_answers: {0: 'Public Key', 1: 'Private Key'},
                        },
                        {
                            id: 'keys-b',
                            text: 'Which key is safe to give to someone else?',
                            possible_answers: {0: 'Public Key', 1: 'Private Key'},
                        }
                    ],
                    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                    resources_url: 'https://test.com',
                }
            ],
            answers: {'keys-a':1, 'keys-b':1, 'blockchain-a':2, 'blockchain-b':1},
        });
        const created = await CourseService.create(course);
        assert(created instanceof Course, "Did not set course");
    });

});
