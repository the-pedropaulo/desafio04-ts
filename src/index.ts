import express, { Request, Response } from "express";
import { router } from "./routes";
import "reflect-metadata"
import { AppDataSource } from "./data-source";


const server = express();

server.use(express.json());
server.use(router);

server.get('/api/', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'OK' });
});

server.listen(5000, () => {
    console.log('Server running on port 5000');
})