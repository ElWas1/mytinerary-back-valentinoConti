import express from 'express';
import userController from '../controllers/user.controller.js';
import { validator } from '../middlewares/validator.js';
import { createUserSchema } from '../schema/user.schema.js';
import { accExistsSignIn } from '../middlewares/auth/accExistsSignIn.middleware.js';
import { accHasBeenVerified } from '../middlewares/auth/accHasBeenVerified.middleware.js';
import { passIsOk } from '../middlewares/auth/passIsOk.middleware.js';

const router = express.Router();

const { getUsers, getUserById, postUser, updateUser, deleteUser } = userController

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/',
    validator(createUserSchema),
    postUser
);

router.put('/:id',
    accExistsSignIn,
    accHasBeenVerified,
    passIsOk,
    updateUser);

router.delete('/:id', deleteUser);

export default router;
