import { EntityManager } from "typeorm";
import { User } from "../../entity/User";
import { getMockEntityManager } from "../../__mocks__/mockEntityManager";
import { UserRepository } from "./UserRepository";

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let managerMock: Partial<EntityManager>

  const mockUser: User = {
    id: 1,
    firstName: 'username',
    lastName: 'password',
    email: 'pedro98seabra@gmail.com',
    password: '123456',
    age: 23
  }

  beforeAll(async () => {
    managerMock = await getMockEntityManager({
      saveReturn: mockUser
    });
    userRepository = new UserRepository(managerMock as EntityManager);
  })

  it('should be able to create a new user', async () => {
    const response = await userRepository.createUser(mockUser);
    expect(managerMock.save).toHaveBeenCalled();
    expect(response).toMatchObject(mockUser);
  })
})