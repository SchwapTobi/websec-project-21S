import express, {Request, Response} from "express";
import {ENDPOINTS} from "../consts";
import _ from "lodash";
import {getUserData} from "../application/database";

const sanitizer = require('sanitizer');

export module SecureRouter {

    const router = express.Router();

    /** example endpoint with improved secrutiy as reference:
     * GET userProfile returns the profile of the user based on the session cookie.
     * The session cookie is a base64 encoded stringified JSON Object which is parsed by the API.
     */
    router.get('/userProfile', async (req: Request, res: Response) => {
        const cookie = _.get(req, 'headers.cookie')

        // check if cookie is present
        if (_.isNil(cookie) || _.isEmpty(cookie)) {
            res.status(401).send({status: 'invalid cookie'});
            return;
        }

        const parsedCookie = Buffer.from(cookie, 'base64').toString('ascii');

        // parsing the object does not evaluate values
        const obj = JSON.parse(parsedCookie);

        // sanitize values anyway
        let temp = {
            id: Sanitizer.sanitizeString(_.get(obj, 'id')),
            password: Sanitizer.sanitizeString(_.get(obj, 'password')),
        }

        const userData = getUserData(temp.id);

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

export module Sanitizer {
    export const sanitizeString = function (unsafe: any): string | null {
        if (unsafe && !_.isNil(unsafe)) {
            try {
                return sanitizer.sanitize(sanitizer.escape(unsafe.toString())).toString();
            } catch {
                return null;
            }
        } else {
            return null;
        }
    }
}
