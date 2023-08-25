import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return {
                createUser: jest.fn()
            }
        })
    }
});

describe('UserController', () => {
    const userController = new UserController();
    
    const mockResponse = makeMockResponse()

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
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
    })


})
