import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken';

const user = {
  id: 3,
  firstName: "PEDRO",
  lastName: "PAULO",
  age: 25
}

export class AuthController {

    login = (request: Request, response: Response): Response => {
      const payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age
      }
      
      const tokenKey = '123456789'
  
      const tokenOptions = {
        subject: String(user.id)
      }
      const token = sign(payload, tokenKey, tokenOptions);

        return response.status(200).json({token})
    }

}
