import { Router, Request, Response } from 'express'
import { UserController } from './controllers/UserController'
import { AuthController } from './controllers/Auth/AuthController'

export const router = Router()

const userController = new UserController()
const authController = new AuthController()

router.post('/user', userController.createUser)
router.get('/user', userController.getUser)
router.delete('/user', userController.deleteUser)

router.post('/login', authController.login)