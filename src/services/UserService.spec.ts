import { UserService } from "./UserService";

jest.mock('../repositories/User/UserRepository.ts');
jest.mock('../data-source.ts', () => {
    initialize: jest.fn();
});

const mockUserRepository = require('../repositories/User/UserRepository');

describe('UserService', () => {
    const userService = new UserService(mockUserRepository);

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
            id: 1,
            fisrtName: 'Teste',
            lastName: 'Paulo',
            age: 25
        }));

        const response = await userService.createUser('Teste', 'Paulo', 25);
        expect(mockUserRepository.createUser).toHaveBeenCalled();
        expect(response).toMatchObject({
            id: 1,
            fisrtName: 'Teste',
            lastName: 'Paulo',
            age: 25
        })
    })
})
