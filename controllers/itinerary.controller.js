import Itinerary from '../models/Itinerary.js';

const controller = {
    getItineraries: async (req, res) => {

        let queries = {};

        if (req.query.cityId) {
            queries.city = req.query.cityId
        }

        try {
            const itineraries = await Itinerary.find(queries)
            .populate('created_by')
            .populate('city')

            if (itineraries.length > 0) {
                return res.status(200).json({
                    success: true,
                    itineraries: itineraries
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
                message: "An error ocurred while trying to get the itineraries."
            })
        }
    },
    getItinerariesByCityId: async (req, res) => {

        let queries = {};

        if (req.query.cityId) {
            queries.city = req.query.cityId
        }

        try {
            const itineraries = await Itinerary.find(queries)
            .populate('created_by')
            .populate('city')

            if (itineraries.length > 0) {
                return res.status(200).json({
                    success: true,
                    itineraries: itineraries
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
                message: "An error ocurred while trying to get the itineraries."
            })
        }
    },
    getItineraryById: async (req, res) => {
        try {
            const oneItinerary = await Itinerary.findById(req.params.id)
            .populate('created_by')
            .populate('city')

            if (oneItinerary) {
                return res.status(200).json({
                    success: true,
                    itinerary: oneItinerary
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
                message: "An error ocurred while trying to get the itinerary."
            })
        }
    },
    postItinerary: async (req, res) => {
        try {
            const createItinerary = await Itinerary.create(req.body)

            if (createItinerary) {
                return res.status(201).json({
                    success: true,
                    message: "The itinerary has been successfully created."
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "An error ocurred while trying to create the itinerary."
            })
        }
    },
    updateItinerary: async (req, res) => {
        try {
            const updateItinerary = await Itinerary.updateOne({ _id: req.params.id }, req.body)

            if (updateItinerary) {
                return res.status(200).json({
                    success: true,
                    message: "The itinerary has been successfully updated."
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
                message: "An error ocurred while trying to update the itinerary."
            })
        }
    },
    deleteItinerary: async (req, res) => {
        try {
            const deleteItinerary = await Itinerary.findByIdAndDelete({ _id: req.params.id })

            if (deleteItinerary) {
                return res.status(200).json({
                    success: true,
                    message: "The itinerary has been successfully deleted."
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
                message: "An error ocurred while trying to delete the itinerary."
            })
        }
    }
}

export default controller;