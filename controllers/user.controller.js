import User from '../models/User.js';
import _ from 'lodash';

const controller = {
    getUsers: async (req, res) => {

        let queries = {};

        if (req.query.name) {
            const sanitizedInput = _.escapeRegExp(req.query.name);
            queries.name = new RegExp(`^${sanitizedInput}`, 'i');
        }

        if (req.query.email) {
            queries.email = { $eq: req.query.email }
        }

        if (req.query.username) {
            queries.username = { $eq: req.query.username }
        }

        try {
            const users = await User.find(queries);

            if (users.length > 0) {
                return res.status(200).json({
                    success: true,
                    users: users
                })
            }

            return res.status(404).json({
                success: false,
                message: "User not found."
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                succss: false,
                message: "An error ocurred while trying to get the users."
            })
        }
    },
    getUserById: async (req, res) => {
        try {
            const oneUser = await User.findById(req.params.id)

            if (oneUser) {
                return res.status(200).json({
                    success: true,
                    user: oneUser
                })
            }

            return res.status(404).json({
                success: false,
                message: "User not found."
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "An error ocurred while trying to get the city."
            })
        }
    },
    postUser: async (req, res) => {
        try {
            const createUser = await User.create(req.body)

            if (createUser) {
                return res.status(201).json({
                    success: true,
                    message: "The user has been successfully created."
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "An error ocurred while trying to create the user."
            })
        }
    },
    updateUser: async (req, res) => {
        try {
            const body = {
                name: typeof req.body.name === 'string' ? req.body.name : null,
                last_name: typeof req.body.last_name === 'string' ? req.body.last_name : null,
                username: typeof req.body.last_name === 'string' ? req.body.last_name : null,
                email: typeof req.body.email === 'string' ? req.body.email : null,
                image: typeof req.body.image === 'string' ? req.body.image : null,
                password: typeof req.body.password === 'string' ? req.body.password : null,
                google: typeof req.body.google === 'boolean' ? req.body.google : false,
                country: typeof req.body.country === 'string' ? req.body.country : null,
                online: typeof req.body.online === 'boolean' ? req.body.online : null,
                verified: typeof req.body.verified === 'boolean' ? req.body.verified : null,
                verified_code: typeof req.body.verified_code === 'string' ? req.body.verified_code : null,
                role: typeof req.body.role === 'string' ? req.body.role : null,
                profile: {
                    bio: typeof req.body.profile === 'object' && typeof req.body.profile.bio === 'string' ? req.body.profile.bio : null
                }
            };

            if (Object.values(body).some(value => value === null)) {
                res.status(400).json({ status: "error", message: "Wrong types of property." });
                return;
            }

            const updateUser = await User.updateOne({ _id: { $eq: req.params.id } }, body)

            if (updateUser) {
                return res.status(200).json({
                    success: true,
                    message: "The user has been successfully updated."
                })
            }

            return res.status(404).json({
                success: false,
                message: "User not found."
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "An error ocurred while trying to update the user."
            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;

            if (!userId || typeof userId !== 'string' || userId.length !== 24) {
                return res.status(400).json({ error: 'Invalid user ID' });
            }

            const deleteUser = await User.findByIdAndDelete(userId);

            if (deleteUser) {
                return res.status(200).json({
                    success: true,
                    message: "The user has been successfully deleted."
                })
            }

            return res.status(404).json({
                success: false,
                message: "User not found."
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "An error ocurred while trying to delete the user."
            })
        }
    }
}

export default controller;