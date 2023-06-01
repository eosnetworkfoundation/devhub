import { Router } from 'express';
import "isomorphic-fetch";
import CourseService from "./services/course.service";
import UserService from "./services/user.service";
import Errors, {CustomError} from "./util/errors";
import BountyService from "./services/bounty.service";
import {sha256} from 'eosjs-ecc';
import CourseProgressService from "./services/course_progress.service";
import {CourseProgress} from "@eosn/devhub-structures/course_progress";

const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const checkJwt = async (req:any, res:any, next:any) => {
    try {
        auth({
            issuerBaseURL: process.env.AUTH0_ISSUER_URL,
            audience: process.env.AUTH0_AUDIENCE
        })(req, res, x => {
            if(x === undefined) return next();
            return res.json(Errors.authenticationError())
        });
    } catch(err){
        console.error("Error checking JWT", err);
        return res.json(Errors.authenticationError())
    }
}


let managementToken: { token:string, expires_at:number}|null = null;

const getManagementToken = async () => {
    if(managementToken && managementToken.expires_at > Date.now()){
        return managementToken.token;
    }

    const options = {
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `${process.env.AUTH0_ISSUER_URL}api/v2/`,
    };

    const token:any = await fetch(`${process.env.AUTH0_ISSUER_URL}/oauth/token`.replace(/\/\//g, "/"), {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body:JSON.stringify(options)
    }).then(res => res.json()).catch(err => {
        console.error("Error getting management token", err);
        return null;
    });

    if(token){
        managementToken = {
            token:token.access_token,
            expires_at: Date.now() + (token.expires_in * 1000)
        }
    }

    if(managementToken){
        return managementToken.token;
    }

    return null;
}

const checkRole = async (authObject:any, requiredRole:string) => {
    try {
        const mgmtToken = await getManagementToken();
        const result = await fetch(`${process.env.AUTH0_ISSUER_URL}api/v2/users/${authObject.payload.sub}/roles`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${mgmtToken}`,
            }
        }).then(res => res.json());

        return !!result.find(role => role.name === requiredRole);

    } catch (err) {
        console.error("Error checking role", err);
        return false;
    }
}

const adminOnly = async (req:any, res:any, next:any) => {
    const isAdmin = await checkRole(req.auth, "admin");
    if(!isAdmin) return res.status(500).send("Admin only");
    next();
}

const userIdFromReq = (req:any): string => {
    const { sub } = req.auth.payload;
    return UserService.subToUserID(sub);
}

const routes = Router();

const senderIp = (req:any) => req.headers['x-forwarded-for'] || req.connection.remoteAddress;

routes.get('/test', (req, res) => {
    res.send(true);
});

routes.get('/auth/status', checkJwt, async (req:any, res) => {
    // Always true if this route succeeds.
    res.send(true);
});

routes.get('/user', checkJwt, async (req:any, res) => {
    const user_id = userIdFromReq(req);
    const user = await UserService.get(user_id);
    res.send(user ? user.asPublic() : Errors.noSuchUser());
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

routes.post('/bounty', checkJwt, adminOnly, async (req, res) => {
    const bounty = await BountyService.create(req.body);
    res.json(bounty);
});

routes.get('/bounty/:slug', async (req, res) => {
    const bounty = await BountyService.get(req.params.slug);
    res.json(bounty);
});

routes.get('/bounties/:type', async (req, res) => {
    const bounties = await BountyService.getByType(parseInt(req.params.type));
    res.json(bounties);
});

routes.get('/progress/:slug_hash', checkJwt, async (req, res) => {
    const user_id = userIdFromReq(req);
    const progress = await CourseProgressService.get(req.params.slug_hash, user_id);
    res.json(progress || new CourseProgress({
        course_slug_hash: req.params.slug_hash,
        user_id,
    }));
});

routes.get('/progresses/:user_id', async (req, res) => {
    const progress = await CourseProgressService.getAllForUser(req.params.user_id);
    res.json(progress || []);
});

routes.post('/progress/timestamp', checkJwt, async (req, res) => {
    const user_id = userIdFromReq(req);
    const {course_slug_hash, timestamp} = req.body;
    const result = await CourseProgressService.setTimestamp(user_id, course_slug_hash, timestamp);
    res.json(result);
});

routes.post('/progress/answers', checkJwt, async (req, res) => {
    const user_id = userIdFromReq(req);
    const {course_slug_hash, answers} = req.body;
    const result = await CourseProgressService.setAnswers(course_slug_hash, user_id, answers);
    res.json(result);
});

routes.get('/progress/finished/:course_slug_hash', checkJwt, async (req, res) => {
    const user_id = userIdFromReq(req);
    const result = await CourseProgressService.finalize(req.params.course_slug_hash, user_id);
    res.json(result);
});

routes.get('/progress/bad-answers/:course_slug_hash', checkJwt, async (req, res) => {
    const user_id = userIdFromReq(req);
    const result = await CourseProgressService.getBadAnswers(req.params.course_slug_hash, user_id);
    res.json(result);
});

routes.get('/finished-progress-count', async (req, res) => {
    const result = await CourseProgressService.getAllProgressCount();
    res.json(result);
});

routes.all('*', (req, res) => {
    console.log('hit bad route', req.method, req.url, req.body);
    res.sendStatus(403)
});

export default routes;
