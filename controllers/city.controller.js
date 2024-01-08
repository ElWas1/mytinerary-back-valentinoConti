import City from '../models/City.js';
import _ from 'lodash'

const controller = {
    getCities: async (req, res) => {

        let queries = {};

        if (req.query.name) {
            const sanitizedInput = _.escapeRegExp(req.query.name);
            queries.name = new RegExp(`^${sanitizedInput}`, 'i');
        }

        try {
            const cities = await City.find(queries)

            if (cities.length > 0) {
                return res.status(200).json({
                    success: true,
                    cities: cities
                })
            }

            return res.status(404).json({
                success: false,
                message: "Element not found."
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                succss: false,
                message: "An error ocurred while trying to get the cities."
            })
        }
    },
    getCityById: async (req, res) => {
        try {
            const oneCity = await City.findById(req.params.id)

            if (oneCity) {
                return res.status(200).json({
                    success: true,
                    city: oneCity
                })
            }

            return res.status(404).json({
                success: false,
                message: "Element not found."
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "An error ocurred while trying to get the city."
            })
        }
    },
    postCity: async (req, res) => {
        try {
            const createCity = await City.create(req.body)

            if (createCity) {
                return res.status(201).json({
                    success: true,
                    message: "The city has been successfully created."
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "An error ocurred while trying to create the city."
            })
        }
    },
    updateCity: async (req, res) => {
        try {

            const { name, last_name, email, image, password, google, country, online, verified, role, profile } = req.body;

            // Verificar si los campos requeridos están presentes
            if (!name || !last_name || !email || !image || !password || !google || !country || !online || !verified || !role || !profile) {
                return res.status(400).json({
                    success: false,
                    message: "Missing data."
                });
            }

            // Verificar los tipos de datos de los campos
            if (
                typeof name !== 'string' ||
                typeof last_name !== 'string' ||
                typeof email !== 'string' ||
                typeof image !== 'string' ||
                typeof password !== 'string' ||
                typeof google !== 'boolean' ||
                typeof country !== 'string' ||
                typeof online !== 'boolean' ||
                typeof verified !== 'boolean' ||
                typeof role !== 'string' ||
                typeof profile !== 'object' ||
                typeof profile.bio !== 'string'
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Types of data provided are not valid."
                });
            }
            const updateCity = await City.updateOne({ _id: { $eq: req.params.id } }, { $set: req.body });

            if (updateCity) {
                return res.status(200).json({
                    success: true,
                    message: "The city has been successfully updated."
                })
            }

            return res.status(404).json({
                success: false,
                message: "Element not found."
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "An error ocurred while trying to update the city."
            })
        }
    },
    deleteCity: async (req, res) => {
        try {
            const deleteCity = await City.findByIdAndDelete({ _id: req.params.id })

            if (deleteCity) {
                return res.status(200).json({
                    success: true,
                    message: "The city has been successfully deleted."
                })
            }

            return res.status(404).json({
                success: false,
                message: "Element not found."
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "An error ocurred while trying to delete the city."
            })
        }
    }
}

export default controller;