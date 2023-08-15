import City from '../models/City.js';

const controller = {
    getCities: async (req, res) => {

        let queries = {};

        if (req.query.name) {
            queries.name = new RegExp(`^${req.query.name}`, 'i')
        }

        if (req.query.name) {
            queries.name = req.query.name
        }

        try {
            const cities = await City.find(queries).populate('user');

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
    deleteCity: async (req, res) => {
        try {
            const deleteCity = await City.deleteOne(req.body)

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