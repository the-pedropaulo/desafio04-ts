import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "diobank",
    password: "diobank123",
    database: "diobank_database",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: ["./migration/*.ts"],
    subscribers: [],
})

AppDataSource.initialize().then(async () => {
    console.log("Datasource initialized");
}).catch(error => console.log(error))
