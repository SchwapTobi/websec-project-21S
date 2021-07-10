import express, {Request, Response} from "express";
import {ENDPOINTS} from "../consts";

export module InsecureRouter {

    const router = express.Router();

    router.get('/test', async (req: Request, res: Response) => {
        res.send({status: 'insecure test'});
    });

    module.exports = router;
}
