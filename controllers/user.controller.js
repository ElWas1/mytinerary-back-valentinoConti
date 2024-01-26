import User from '../models/User.js';
import _ from 'lodash';
import bcryptjs from 'bcryptjs';

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
            const allowedFields = ['name', 'last_name', 'username', 'email', 'image', 'password', 'google', 'country', 'online', 'verified', 'verified_code', 'role', 'profile', 'new_password'];

            const body = {};
            let validTypes = true;

            allowedFields.forEach(field => {
                if (field in req.body) {
                    switch (field) {
                        case 'profile':
                            if (typeof req.body.profile === 'object' && 'bio' in req.body.profile) {
                                body.profile = { bio: req.body.profile.bio };
                            } else {
                                validTypes = false;
                            }
                            break;
                        case 'email':
                        case 'password':
                        case 'new_password':
                            if (typeof req.body[field] === 'string') {
                                body[field] = req.body[field];
                            } else {
                                validTypes = false;
                            }
                            break;
                        case 'google':
                        case 'online':
                        case 'verified':
                            if (typeof req.body[field] === 'boolean') {
                                body[field] = req.body[field];
                            } else {
                                validTypes = false;
                            }
                            break;
                        default:
                            if (typeof req.body[field] === 'string') {
                                body[field] = req.body[field];
                            } else {
                                validTypes = false;
                            }
                    }
                }
            });

            if (!validTypes || !body.email || !body.password) {
                return res.status(400).json({ status: "error", message: "Invalid types or missing required fields." });
            }
            const form_password = body.password;
            const new_password = body.new_password;

            if (new_password && new_password !== form_password) {
                body.password = bcryptjs.hashSync(new_password, 10)
            } else {
                delete body.password;
            }

            const updateUser = await User.updateOne({ _id: { $eq: req.params.id } }, body);

            if (updateUser) {
                return res.status(200).json({
                    success: true,
                    message: "The user has been successfully updated."
                });
            }

            return res.status(404).json({
                success: false,
                message: "User not found."
            });

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