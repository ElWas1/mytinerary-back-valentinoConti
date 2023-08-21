import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

const { getUsers, getUserById, postUser, updateUser, deleteUser } = userController

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', postUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
