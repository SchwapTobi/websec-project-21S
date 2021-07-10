import express, {Request, Response} from "express";

export module InsecureRouter {

    const router = express.Router();
    const JASON = require('JASON')

    router.get('/test', async (req: Request, res: Response) => {
        const obj = function (){
            console.log("test")
            return;
        }

        let str = JASON.stringify(obj);
        console.log(str)
        await JASON.parse(str)();

        res.send({status: 'insecure test'});
    });

    module.exports = router;
}
