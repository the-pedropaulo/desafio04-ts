import { EntityManager } from "typeorm";
import { User } from "../../entity/User";
import { AppDataSource } from "../../data-source";

export class UserRepository {
  constructor(private manager: EntityManager) {
    this.manager = manager;
  }
  async createUser(user: User): Promise<User> {
    return await this.manager.save(user);
  }

  async getUser(userId: string): Promise<User> {
    const id = Number(userId);
    console.log(id)
    return this.manager.findOne(User, {
      where: { id: id },
    });
  }

  async getUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
    return this.manager.findOne(User, { 
      where: { 
        email, 
        password
      } 
    });
  }
  
}