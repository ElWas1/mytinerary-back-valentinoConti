import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import { verify } from '../helpers/google-verify.js'

const controller = {

    signUp: async (req, res, next) => {
        req.body.verified_code = crypto.randomBytes(10).toString('hex')
        req.body.password = bcryptjs.hashSync(req.body.pass, 10)
        req.body.online = false
        req.body.verified = true
        req.body.role = 'user'
        try {
            await User.create(req.body)
            return res.status(201).json({
                success: true,
                message: 'User has been successfully created.'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error while trying to sign the user up.'
            })
        }
    },

    signIn: async (req, res, next) => {
        try {
            let user = await User.findOneAndUpdate(
                { email: req.user.email },
                { online: true },
                { new: true }
            )

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    image: user.image
                },
                process.env.SECRET_TOKEN,
                { expiresIn: '3h' }
            )

            user.password = null;

            return res.status(200).json({
                success: true,
                message: 'User has been successfully authenticated.',
                response: {
                    token,
                    user: {
                        name: user.name,
                        image: user.image,
                        email: user.email,
                        id: user._id
                    }
                }
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error while trying to authenticate the user.'
            })
        }
    },

    googleAuth: async (req, res, next) => {
        const { token_id } = req.body;
        try {
            // Verify Google token from Front-End
            const { name, last_name, email, image, country } = await verify(token_id)

            let user = await User.findOne({ email })

            // If User does not exist:
            if (!user) {
                // Create User:
                const data = {
                    name,
                    last_name,
                    email,
                    image,
                    password: bcryptjs.hashSync(process.env.DEFAULT_PASS, 10),
                    google: true,
                    country,
                    online: true,
                    verified: true,
                    role: 'user',
                    verified_code: crypto.randomBytes(10).toString('hex')
                }

                user = await User.create(data);
            }

            user.online = true
            await user.save()

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    image: user.image
                },
                process.env.SECRET_TOKEN,
                { expiresIn: '10h' }
            )

            return res.status(200).json({
                success: true,
                message: 'User has been successfully authenticated using Google account.',
                response: {
                    token,
                    user: {
                        name: user.name,
                        image: user.image,
                        email: user.email
                    }
                }
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error while trying to authenticate the user.'
            })
        }
    },

    signOut: async (req, res, next) => {
        try {
            const user = await User.findOneAndUpdate(
                { email: req.user.email },
                { online: false },
                { new: true }
            )
            return res.status(200).json({
                success: true,
                message: 'Successfully logged out.'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error while trying to authenticate the user.'
            })
        }
    },

    token: async (req, res, next) => {
        const { user } = req
        try {
            return res.status(200).json({
                user: {
                    name: user.name,
                    email: user.email,
                    image: user.image
                }
            })
        } catch (error) {
            next(error);
        }
    },

    isTokenNearExpiration: async (req, res) => {

        const oldToken = (req.headers.authorization).split(' ')[1];

        if (!oldToken) {
            return res.status(401).json({ message: 'No token provided.' });
        }

        const { exp } = jwt.decode(oldToken);

        const currentTime = Math.floor(Date.now() / 1000);
        const bufferTime = (30 * 60);

        const nearExpiration = (exp - currentTime <= bufferTime);

        if (nearExpiration) {
            try {
                let user = await User.findOneAndUpdate(
                    { email: req.user.email },
                    { online: true },
                    { new: true }
                )

                const token = jwt.sign(
                    {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        image: user.image
                    },
                    process.env.SECRET_TOKEN,
                    { expiresIn: '3h' }
                )

                user.password = null;

                return res.status(200).json({
                    success: true,
                    message: 'Token has been successfully renewed.',
                    response: {
                        token,
                        user: {
                            name: user.name,
                            image: user.image,
                            email: user.email,
                            id: user._id
                        }
                    }
                })

            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Error while trying to renew the token.'
                })
            }
        } else {
            return res.status(204).json({
                success: true,
                message: 'Token does not need to be renewed yet.'
            })
        }
    }
}

export default controller;