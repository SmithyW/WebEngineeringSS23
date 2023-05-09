import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mongodb",
    host: process.env.DB_HOST ?? "localhost",
    port: parseInt(process.env.DB_PORT) ?? 27017,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
})