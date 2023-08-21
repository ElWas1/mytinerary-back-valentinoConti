import City from '../models/City.js';

const controller = {
    getCities: async (req, res) => {

        let queries = {};

        if (req.query.name) {
            queries.name = new RegExp(`^${req.query.name}`, 'i')
        }

        try {
            const cities = await City.find(queries).populate('create_by');

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
            const updateCity = await City.updateOne({ _id: req.params.id }, req.body)

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