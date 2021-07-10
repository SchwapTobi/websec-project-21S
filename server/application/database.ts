import _ from "lodash";

/** MOCK DATABASE */

const database = new Map<string, UserData>();
database.set('123', {id: '123', password: 'qX*!NCZk=BmJcc3*', name: 'John', role: 'admin', points: 9999});
database.set('456', {id: '456', password: 'Alice123', name: 'Alice', role: 'user', points: 14});
database.set('789', {id: '789', password: 'badpassword', name: 'Bob', role: 'user', points: 9});
database.set('1337', {id: '1337', password: 'hello', name: 'Mallory', role: 'user', points: 0});

export function getUserData(id: string | null) {
    if (_.isNil(id)) return null;
    return database.get(id);
}

interface UserData {
    name: string,
    password: string,
    id: string,
    role: 'user' | 'admin',
    points: number
}
