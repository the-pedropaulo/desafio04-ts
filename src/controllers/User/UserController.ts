import { Request, Response } from 'express'
import { UserService } from '../../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response): Response => {
        const user = request.body

        if(!user.firstName || !user.lastName || !user.email || !user.password || !user.age) {
            return response.status(400).json({ message: 'Bad request! All params are required.'})
        }

        this.userService.createUser(user.firstName, user.lastName, user.email, user.password, user.age)
        return response.status(201).json({ message: 'Usuário criado'})
    }

    getUser = async (request: Request, response: Response): Promise<Response> => {
        const user = request.body;
        const res = await this.userService.getUser(user.id);
        return response.status(200).json(res)
    }


    
    deleteUser = (request: Request, response: Response) => {
        const user = request.body

        if(!user.firstName || !user.lastName || !user.age) {
            return response.status(400).json({ message: 'Bad request! All params are required.'})
        }

        return response.status(200).json({ message: 'Usuário deletado'})
    }
}
