import _ from "lodash";

const supertest = require("supertest");
const BASEURL = 'http://localhost:8080/insecure';

describe('security tests', function () {

    it('should return unauthorized', async () => {
        await supertest(BASEURL)
            .get('/userProfile')
            .expect(401)
            .then((response: any) => {
                //check response
                expect(_.isObject(response.body)).toBeTruthy();
                expect(_.get(response.body, 'status')).toBe('invalid cookie')
            });
    });

    it('should return wrong password', async () => {
        await supertest(BASEURL)
            .get('/userProfile')
            .set('cookie', 'eyJpZCI6IjEzMzciLCJwYXNzd29yZCI6Indyb25ncGFzc3dvcmQifQo=')
            .expect(401)
            .then((response: any) => {
                //check response
                expect(_.isObject(response.body)).toBeTruthy();
                expect(_.get(response.body, 'status')).toBe('invalid password')
            });
    });

    it('should return user data', async () => {
        await supertest(BASEURL)
            .get('/userProfile')
            .set('cookie', 'eyJpZCI6IjEzMzciLCJwYXNzd29yZCI6ImhlbGxvIn0=')
            .expect(200)
            .then((response: any) => {
                //check response
                expect(_.isObject(response.body)).toBeTruthy();
                expect(_.get(response, 'body.id', null)).toBe('1337')
                expect(_.get(response, 'body.password', null)).toBe('hello')
                expect(_.get(response, 'body.name', null)).toBe('Mallory')
                expect(_.get(response, 'body.points', null)).toBe(0)
                expect(_.get(response, 'body.role', null)).toBe('user')
            });
    });

});
