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
db.users.insertOne({
	_id: "Ujmq394n0mhwepfu",
	name: "Test User",
	email: "user@example.test",
	phone: undefined,
});

db.contracts.insert([
	{
		_id: "Cweu89r7cn23",
		begin: new Date(2022, 9, 1),
		end: new Date(2023, 0, 31),
		timePerWeekday: [
			{
				time: 4,
				weekday: 2,
			},
			{
				time: 1,
				weekday: 3,
			},
		],
		user: "Ujmq394n0mhwepfu",
		weeklyTime: 5,
	},
	{
		_id: "Cx280493bzc71",
		begin: new Date(2023, 3, 15),
		end: new Date(2023, 10, 30),
		timePerWeekday: [
			{
				time: 3,
				weekday: 1,
			},
			{
				time: 2,
				weekday: 3,
			},
			{
				time: 5,
				weekday: 4,
			},
		],
		user: "Ujmq394n0mhwepfu",
		weeklyTime: 10,
	},
]);

db.workdays.insert([
	{
		_id: "W43r89penu",
		start: new Date(2023, 3, 15, 10, 0, 0),
		end: new Date(2023, 3, 15, 13, 15, 0),
		break: null,
		note: "",
		user: "Ujmq394n0mhwepfu",
	},
	{
		_id: "Wc0i3mq04w9m",
		start: new Date(2023, 3, 16, 8, 0, 0),
		end: new Date(2023, 3, 15, 13, 17, 0),
		break: {
            hours: 3,
            minutes: 30
        },
		note: "",
		user: "Ujmq394n0mhwepfu",
	},
]);
