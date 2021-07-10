/**
 * EXAMPLE PAYLOADS:
 * to test the API, stringify one of the payloads below, convert to Base64 and add it to the request header (cookie).
 */

// simple login with user 'Mallory'
// eyJpZCI6IjEzMzciLCJwYXNzd29yZCI6ImhlbGxvIn0=
export const test1 = {
    'id': '1337',
    'password': 'hello'
}

// simple login with user 'Mallory' but wrong password
// eyJpZCI6IjEzMzciLCJwYXNzd29yZCI6Indyb25ncGFzc3dvcmQifQo=
export const test2 = {
    'id': '1337',
    'password': 'wrongpassword'
}




