# WebEngineeringSS23

## Database

A `mongoDB` database is needed by the server application. A `docker-compose` file is provided to run `mongoDB` in a docker container.

### Preparation
The `docker-compose.yml` file uses environment variables for authentication. You need to copy the file `.env.example` and rename it to `.env`. Fill the file with values.

It should look like:

```
MONGO_USER=the_user
MONGO_PASSWORD=secret_password
```

### Start mongoDB
```sh
# navigate to path with docker-compose.yml
# start docker containers in background
$ docker-compose up -d
```

### Stop mongoDB
```sh
# navigate to path with docker-compose.yml
# shutdown docker containers
$ docker-compose stop
```

### Use mongoDB Express for administration
The `docker-compose` file also provides mongoDB Express for administration. The container is available at: [http://localhost:8081/](http://localhost:8081/)

## typeorm

Reference for typeorm with MongoDB at [https://orkhan.gitbook.io/typeorm/docs/mongodb](https://orkhan.gitbook.io/typeorm/docs/mongodb)
