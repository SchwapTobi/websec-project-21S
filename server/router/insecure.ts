import express, {Request, Response} from "express";
import _ from "lodash";
import {getUserData} from "../application/database";

export module InsecureRouter {

    const router = express.Router();
    const JASON = require('JASON')

    /** example endpoint for insecure deserialization:
     * GET userProfile returns the profile of the user based on the (insecure) session cookie.
     * The session cookie is a base64 encoded stringified JSON Object which is (insecurely) parsed by the API.
     */
    router.get('/userProfile', async (req: Request, res: Response) => {
        const cookie = _.get(req, 'headers.cookie')

        // check if cookie is present
        if (_.isNil(cookie) || _.isEmpty(cookie)) {
            res.status(401).send({status: 'invalid cookie'});
            return;
        }

        const parsedCookie = Buffer.from(cookie, 'base64').toString('ascii');

        //TODO: make it insecure
        const obj = JSON.parse(parsedCookie);
        console.log(obj)

        const userData = getUserData(obj.id);

        // check if user exists
        if (_.isNil(userData)) {
            res.status(404).send({status: 'user not found'});
            return;
        }

        // check if password is correct
        if (obj.password != userData.password) {
            res.status(401).send({status: 'invalid password'});
            return;
        }

        res.status(200).send(userData);
    });

    module.exports = router;
}
