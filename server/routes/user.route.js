import express from 'express';
import UserController from '../controllers/user.controller.js';

const UserRouter = express.Router();

UserRouter.post('/', UserController.createUser);
UserRouter.post('/register', UserController.registerUser);
UserRouter.get('/', UserController.getUsers);
UserRouter.get('/:id', UserController.getUserById);
UserRouter.put('/:id', UserController.updateUser);
UserRouter.delete('/:id', UserController.deleteUser);
UserRouter.post('/login', UserController.loginUser);
UserRouter.post('/forgot-password', UserController.forgotPassword);
UserRouter.post('/reset-password/:token', UserController.resetPassword);

export default UserRouter;
