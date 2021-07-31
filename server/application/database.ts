var DATABASE_MANAGER = (function (exports) {
/** MOCK DATABASE INTERFACE*/
const database = new Map();
database.set('123', {id: '123', password: 'qX*!NCZk=BmJcc3*', name: 'John', role: 'admin', points: 9999});
database.set('456', {id: '456', password: 'Alice123', name: 'Alice', role: 'user', points: 14});
database.set('789', {id: '789', password: 'badpassword', name: 'Bob', role: 'user', points: 9});
database.set('1337', {id: '1337', password: 'hello', name: 'Mallory', role: 'user', points: 0});

function getUserData(id) {
    if (id === null) return null;
    return database.get(id);
}

function updatePoints(id, points) {
    if (id === null || points === null) return null;
    let tmp = database.get(id);
    if (tmp === null || tmp === undefined) return null;
    // @ts-ignore
    tmp.points = points;
    database.set(id, tmp);
}

    getUserData.this= exports;
    updatePoints.this= exports;
    exports.getUserData= getUserData;
    exports.updatePoints= updatePoints;
    return exports;
})(typeof exports !== 'undefined' ? exports : {});
