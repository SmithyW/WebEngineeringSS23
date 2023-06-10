db = new Mongo().getDB("admin");

db.createUser({
	user: "ontime",
	pwd: "0nt1me",
	roles: [
		{
			role: "readWrite",
			db: "ontime",
		},
	],
});

db = new Mongo().getDB("ontime");

db.createCollection("users");
db.createCollection("contracts");
db.createCollection("workdays");

// The current database to use.
//use("ontime");

// Create a new document in the collection.
/*
db.users.insertOne({
	"_id": "6484625e583cdf555c1b6dbb",
	"name": "Test User",
	"email": "user@example.test",
	"phone": null
});

db.contracts.insert([
	{
		"_id": "64845c3d583cdf555c1b6d9f",
		"begin": "2022-10-01T00:00:00Z",
		"end": "2023-01-31T00:00:00Z",
		"weeklyTime": 5,
		"timePerWeekday": [
			{
			"time": 4,
			"weekday": 2
			},
			{
			"time": 1,
			"weekday": 3
			}
		],
		"user": "6484625e583cdf555c1b6dbb"
	},
	{
		"_id": "64845c6c583cdf555c1b6da1",
		"begin": "2023-04-15T00:00:00Z",
		"end": "2023-11-30T00:00:00Z",
		"weeklyTime": 10,
		"timePerWeekday": [
			{
			"time": 3,
			"weekday": 1
			},
			{
			"time": 2,
			"weekday": 3
			},
			{
			"time": 5,
			"weekday": 4
			}
		],
		"user": "6484625e583cdf555c1b6dbb"
	}
]);

db.workdays.insert([
	{
		"_id": "64845a59583cdf555c1b6d9b",
		"start": "2023-04-15T10:00:00Z",
		"end": "2023-04-15T13:15:00Z",
		"break": null,
		"note": "",
		"user": "6484625e583cdf555c1b6dbb"
	},
	{
		"_id": "64845ab1583cdf555c1b6d9d",
		"start": "2023-04-16T08:00:00Z",
		"end": "2023-04-15T13:17:00Z",
		"break": {
			"hours": 3,
			"minutes": 30
		},
		"note": "",
		"user": "6484625e583cdf555c1b6dbb"
	},
]);
*/