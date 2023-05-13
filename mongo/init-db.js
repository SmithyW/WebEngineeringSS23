db = new Mongo().getDB("admin");

db.createUser({
    user: 'ontime',
    pwd: '0nt1me',
    roles: [
        {
            role: 'readWrite',
            db: 'ontime'
        }
    ]
});

db = new Mongo().getDB("ontime");

db.createCollection('users');
db.createCollection('test');

db.test.insert([
    {
        fruits: ["apple", "banana", "strawberry"],
        vegetables: ["carrot", "cucumber", "tomato"]
    }
]);
