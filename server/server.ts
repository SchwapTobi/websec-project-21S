const APPLICATION = {
    PORT: 8080,
    URL: 'localhost',
}

const BASEURL = `${APPLICATION.URL}:${APPLICATION.PORT}`;

const ENDPOINTS = {
    SECURE: `/secure/`,
    INSECURE: `/insecure/`,
}

const insecureRouter = require('./router/insecure');
const secureRouter = require('./router/secure');
const express = require('express');
const app = express();

app.use(express.json());
app.use(ENDPOINTS.INSECURE, insecureRouter);
app.use(ENDPOINTS.SECURE, secureRouter);

app.listen(APPLICATION.PORT, function () {
    console.log(`listening on ${BASEURL}`);
    console.log(`available endpoints:`);
    console.log(`${BASEURL}${ENDPOINTS.SECURE}`);
    console.log(`${BASEURL}${ENDPOINTS.INSECURE}`);
});
