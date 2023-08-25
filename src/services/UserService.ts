import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserRepository } from "../repositories/User/UserRepository";

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository = new UserRepository(AppDataSource.manager)) {
        this.userRepository = userRepository;
    }

    createUser = (firstName: string, lastnName: string, age) => {
        const user = new User(firstName, lastnName, age);
        return this.userRepository.createUser(user);
    }

    getUser = async (id: string) => {
        return await this.userRepository.getUser(id);
    }

}

