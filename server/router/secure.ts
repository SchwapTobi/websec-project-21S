import express, {Request, Response} from "express";
import {ENDPOINTS} from "../consts";

export module SecureRouter {

    const router = express.Router();

    router.get(ENDPOINTS.SECURE, async (req: Request, res: Response) => {
        res.send({status: 'secure test'});
    });

    module.exports = router;
}
