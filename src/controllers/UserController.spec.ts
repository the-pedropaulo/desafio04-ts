import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn()
    }
    
    const userController = new UserController(mockUserService as UserService);
    
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

    it('Não deve criar usuário caso não informe o nome', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'nath@test.com'
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
    })

    it('Não deve criar usuário caso não informe o e-mail', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: ''
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
    })

    it('Deve deletar o usuário', () => {
        const mockRequest = {
            body:  {
                name: "Joana",
                email: "joana@dio.com",
            }
        } as Request

        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
    })

    it('Não deve deletar o usuário caso não informe o e-mail', () => {
        const mockRequest = {
            body:  {
                name: "Joana",
                email: "",
            }
        } as Request

        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
    })

})
