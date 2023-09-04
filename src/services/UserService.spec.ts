import { UserService } from "./UserService";
import * as jwt from 'jsonwebtoken';

jest.mock('../repositories/User/UserRepository.ts');
jest.mock('../data-source.ts', () => {
    initialize: jest.fn();
});
jest.mock('jsonwebtoken');

const mockUserRepository = require('../repositories/User/UserRepository');

describe('UserService', () => {
    const userService = new UserService(mockUserRepository);

    const mockUser = {
        id: 1,
        firstName: 'Teste',
        lastName: 'Paulo',
        email: 'pedro98seabra@gmail.com',
        password: '123456',
        age: 25
    }

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser));

        const response = await userService.createUser('Teste', 'Paulo', 'pedro98seabra@gmail.com', '123456', 25);
        expect(mockUserRepository.createUser).toHaveBeenCalled();
        expect(response).toMatchObject({
            id: 1,
            firstName: 'Teste',
            lastName: 'Paulo',
            email: 'pedro98seabra@gmail.com',
            password: '123456',
            age: 25
        })
    })

    it('It should return an user token!', async () => {
        jest.spyOn(userService, 'getAutheticateUser').mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt, 'sign').mockImplementation(() => Promise.resolve('token'));
        const token = await userService.getToken('pedro98seabra@gmail.com', '123456');
        expect(token).toBe('token')
    })

    it('It should return an error if it cant find a user!', async () => {
        jest.spyOn(userService, 'getAutheticateUser').mockImplementation(() => Promise.resolve(null))

        await expect(userService.getToken('invalid@gmail.com', '123456')).rejects.toThrowError('Email or password invalid!')
    })
})
