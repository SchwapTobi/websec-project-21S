# Web Security 2021S - Insecure Deserialization
Sample application showing the risks of insecure deserialization using Node.js. Practical part for the course "KV Web Security" @JKU Linz.

⚠ This sample application contains unsafe code and should only be used for demonstration purposes ⚠

Link to the project [paper](https://github.com/SchwapTobi/websec-project-21S/blob/master/insecure_deserialization_schwap_reisinger.pdf) 
## Setup:
Make sure [node](https://nodejs.org/en/download/) and [typescript](https://www.typescriptlang.org/download) are installed.

Clone the repository and install all dependencies:
`npm install`

Compile TS files by running `tsc` OR run `npm start` to transpile ts files and run the local server.

## Tests:
To run the tests, make sure the local server is online, then run `npm test` or `tsc && jest`.

In `insecure.test.ts` there are several tests to check the endpoints, as well as a specific test using the deserialization vulnerability to change the user's state.

In `secure.test.ts`, the same tests demonstrate that simple changes in the way of parsing the cookie mitigate the risks of JSON deserialization in this demo application.

## Demo App:
To send requests to the server, [postman](https://www.postman.com/) can be used. Create a new GET request to http://localhost:8080/insecure/userProfile or http://localhost:8080/secure/userProfile and set the cookie in the "Headers" tab. To generate a cookie, stringify a JSON example from [/server/application/examples.ts](https://github.com/SchwapTobi/websec-project-21S/blob/master/server/application/examples.ts) and convert it to base64.
