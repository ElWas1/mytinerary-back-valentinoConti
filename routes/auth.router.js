import express from 'express';
import authController from '../controllers/auth.controller.js';
import { accExistsSignUp } from '../middlewares/auth/accExistsSignUp.middleware.js';
import { accExistsSignIn } from '../middlewares/auth/accExistsSignIn.middleware.js';
import { accHasBeenVerified } from '../middlewares/auth/accHasBeenVerified.middleware.js';
import { passIsOk } from '../middlewares/auth/passIsOk.middleware.js';
import passport from '../middlewares/passport.js';
import { validator } from '../middlewares/validator.js';
import { createUserSchema, signInSchema } from '../schema/user.schema.js';

const { signUp, signIn, signOut, token, googleAuth } = authController;

const router = express.Router();

router.post(
    '/signup',
    validator(createUserSchema),
    accExistsSignUp,
    signUp
)

router.post(
    '/signin',
    validator(signInSchema),
    accExistsSignIn,
    accHasBeenVerified,
    passIsOk,
    signIn
)

router.post(
    '/signout',
    passport.authenticate('jwt', { session: false }), signOut
)

router.post('/google', googleAuth)

router.post('/token',
    passport.authenticate('jwt', { session: false }), token)

export default router;