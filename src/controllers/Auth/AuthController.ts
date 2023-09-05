import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken';
import { UserService } from '../../services/UserService';

const user = {
  id: 3,
  firstName: "PEDRO",
  lastName: "PAULO",
  age: 25
}

export class AuthController {

  constructor(private userService: UserService = new UserService()) {
      this.userService = userService;
  }

    login = async (request: Request, response: Response): Promise<Response> => {
      const { email, password } = request.body;
      
      try {
        const token = await this.userService.getToken(email, password);
        return response.status(200).json({token})
      } catch (error) {
        return response.status(500).json({message: 'Email or passsword invalid!'});
      }
    }

}
