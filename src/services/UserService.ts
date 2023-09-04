import { sign } from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserRepository } from "../repositories/User/UserRepository";

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository = new UserRepository(AppDataSource.manager)) {
        this.userRepository = userRepository;
    }

    createUser = (firstName: string, lastName: string, email: string, password: string, age: number) => {
        const user = new User(firstName, lastName, email, password, age);
        return this.userRepository.createUser(user);
    }

    getUser = async (id: string) => {
        return await this.userRepository.getUser(id);
    }

    getAutheticateUser = async (email: string, password: string): Promise<User | null> => {
        return this.userRepository.getUserByEmailAndPassword(email, password);
    }

    getToken = async (email: string, password: string): Promise<string> => {
        const user = await this.getAutheticateUser(email, password);
        
        if(!user) {
            throw new Error('Email or password invalid!');
        }

        const payload = {
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age
        }
        
        const tokenKey = '123456789'
    
        const tokenOptions = {
            subject: String(user.id)
        }
        const token = sign(payload, tokenKey, tokenOptions);
        
        return token;
    }

}

