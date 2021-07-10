import _ from "lodash";

const supertest = require("supertest");
const BASEURL = 'http://localhost:8080/secure';

describe('security tests', function () {
    // hello world test
    it('should return something', async () => {
        await supertest(BASEURL)
            .get('/test')
            .expect(200)
            .then((response: any) => {
                //check response
                expect(_.isObject(response.body)).toBeTruthy();
            })
    });

});
