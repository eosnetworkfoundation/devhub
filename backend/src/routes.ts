import { Router } from 'express';
import "isomorphic-fetch";
import CourseService from "./services/course.service";
import UserService from "./services/user.service";
import Errors, {CustomError} from "./util/errors";
import ChallengeService from "./services/challenge.service";
import {sha256} from 'eosjs-ecc';
import CourseProgressService from "./services/course_progress.service";
import {CourseProgress} from "@eosn/devhub-structures/course_progress";
import {FireAuth} from "./util/firebase";


const authOnly = async (req:any, res:any, next:any) => {
    // get bearer token
    const authorization = req.headers['authorization'];
    if(!authorization) return res.json(Errors.authenticationError());

    // validate token
    const token = authorization.split(' ')[1];
    if(!token || !token.length) return res.json(Errors.authenticationError());

    // decode token
    const decodedToken = await FireAuth.decodeToken(token);
    if(!decodedToken) return res.json(Errors.authenticationError());
    if(decodedToken === "token_expired") return res.json(Errors.tokenExpired());

    // get user
    const user = await UserService.get(UserService.subToUserID(decodedToken.uid));
    if(!user) return res.json(Errors.authenticationError());

    req.user = user;

    next();
}

const routes = Router();

routes.get('/test', (req, res) => {
    res.send(true);
});

routes.get('/auth/status', authOnly, async (req:any, res) => {
    // Always true if this route succeeds.
    res.send(true);
});

routes.get('/user', authOnly, async (req:any, res) => {
    res.send(req.user);
});

routes.get('/user/:user_id', async (req:any, res) => {
    const user = await UserService.get(req.params.user_id);
    res.send(user ? user.asPublic() : Errors.noSuchUser());
});

routes.post('/user', async (req, res) => {
    const newUser = await UserService.create(req.body);
    res.send(newUser);
});

routes.post('/course', async (req, res) => {
    if(!process.env.IS_ADMIN_API) return res.status(500).send("Admin only");
    const course = await CourseService.create(req.body);
    res.json(course);
});

routes.get('/course/:slug', async (req, res) => {
    const course = await CourseService.get(sha256(req.params.slug), true);
    res.json(course || Errors.noSuchCourse());
});

routes.get('/courses', async (req, res) => {
    const essential = await CourseService.getEssential();
    const popular = await CourseService.getPopular();
    const courses = (await CourseService.getCourses())
        .filter(x => !essential.find(c => c.slug_hash === x.slug_hash))
        .filter(x => !popular.find(c => c.slug_hash === x.slug_hash));

    res.json({
        essential,
        popular,
        courses
    });
});

routes.get('/courses/continue-watching', async (req, res) => {
    // const courses = await CourseService.getContinueWatching(req.oidc.user?.id);
    // res.json(courses);
    res.json(false);
});

routes.get('/courses/:search', async (req, res) => {
    const courses = await CourseService.search(req.params.search);
    res.json(courses);
});

routes.get('/progress/:slug_hash', authOnly, async (req:any, res) => {
    const progress = await CourseProgressService.get(req.params.slug_hash, req.user.id);
    res.json(progress || new CourseProgress({
        course_slug_hash: req.params.slug_hash,
        user_id:req.user.id,
    }));
});

routes.get('/progresses/:user_id', async (req, res) => {
    const progress = await CourseProgressService.getAllForUser(req.params.user_id);
    res.json(progress || []);
});

routes.post('/progress/timestamp', authOnly, async (req:any, res) => {
    const {course_slug_hash, timestamp} = req.body;
    const result = await CourseProgressService.setTimestamp(req.user.id, course_slug_hash, timestamp);
    res.json(result);
});

routes.post('/progress/answers', authOnly, async (req:any, res) => {
    const {course_slug_hash, answers} = req.body;
    const result = await CourseProgressService.setAnswers(course_slug_hash, req.user.id, answers);
    res.json(result);
});

routes.get('/progress/finished/:course_slug_hash', authOnly, async (req:any, res) => {
    const result = await CourseProgressService.finalize(req.params.course_slug_hash, req.user.id);
    res.json(result);
});

routes.get('/progress/bad-answers/:course_slug_hash', authOnly, async (req:any, res) => {
    const result = await CourseProgressService.getBadAnswers(req.params.course_slug_hash, req.user.id);
    res.json(result);
});

routes.get('/finished-courses-count', async (req, res) => {
    const result = await CourseProgressService.getAllFinishedProgresses();
    res.json(result);
});

//
routes.post('/challenge', async (req, res) => {
    if(!process.env.IS_ADMIN_API) return res.status(500).send("Admin only");
    const challenge = await ChallengeService.create(req.body);
    res.json(challenge);
});

routes.get('/challenge/:id', async (req, res) => {
    res.json(await ChallengeService.get(req.params.id));
});

routes.get('/challenges', async (req, res) => {
    res.json(await ChallengeService.getAll());
});

routes.all('*', (req, res) => {
    console.log('hit bad route', req.method, req.url, req.body);
    res.sendStatus(403)
});

export default routes;
