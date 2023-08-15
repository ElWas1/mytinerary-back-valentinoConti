import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

const { getUsers, getUserById, postUser, deleteUser } = userController

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', postUser);

router.delete('/:id', deleteUser);

export default router;
