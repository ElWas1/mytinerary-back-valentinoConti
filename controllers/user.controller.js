import User from '../models/User.js';

const controller = {
    getUsers: async (req, res) => {

        let queries = {};

        if (req.query.name) {
            queries.name = new RegExp(`^${req.query.name}`, 'i')
        }

        if (req.query.name) {
            queries.name = req.query.name
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
    deleteUser: async (req, res) => {
        try {
            const deleteUser = await User.deleteOne(req.body)

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