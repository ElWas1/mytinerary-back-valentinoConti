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

            if (typeof req.body !== 'object' || Array.isArray(req.body)) {
                return res.status(400).json({
                    success: false,
                    message: "The body of the request must be a literal object."
                });
            }

            const updateCity = await City.updateOne({ _id: { $eq: req.params.id } }, req.body);

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