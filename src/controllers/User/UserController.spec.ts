import { UserController } from "./UserController";
import { Request } from 'express'
import { makeMockResponse } from "../../__mocks__/mockResponse.mock";
import { makeMockRequest } from "../../__mocks__/mockRequest.mock";
import { UserService } from "../../services/UserService";

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn()
}

jest.mock('../../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
});

describe('UserController', () => {
    const userController = new UserController();
    
    const mockResponse = makeMockResponse()

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                firstName: 'Pedro',
                lastName: 'Paulo',
                email: 'pedro@example.com',
                password: 'password',
                age: 25

            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve retornar um erro caso não informe o firstName', () => {
        const mockRequest = {
            body: {
                firstName: '',
                lastName: 'fjdhfj',
                age: 25
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
    })

    it('Deve retornar um erro caso não informe o lastName', () => {
        const mockRequest = {
            body: {
                firstName: 'Nath',
                lastName: '',
                age: 25
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
    })

    it('Deve deletar o usuário', () => {
        const mockRequest = {
            body:  {
                firstName: 'Nath',
                lastName: 'fdjfhdjdsfd',
                age: 25
            }
        } as Request

        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado'})
    })

    it('It should return a user with the informed ID' , () => {
        const mockRequest = makeMockRequest({
            params:  {
                userId: '123456',
            }
        }) as Request

        userController.getUser(mockRequest, mockResponse);
        expect(mockUserService.getUser).toHaveBeenCalledWith('123456');
        expect(mockUserService.getUser).toBe(200);
    })


})
