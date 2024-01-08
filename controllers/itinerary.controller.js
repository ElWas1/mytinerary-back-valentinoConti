import Itinerary from '../models/Itinerary.js';

const controller = {
    getItineraries: async (req, res) => {

        let queries = {};

        if (req.query.cityId) {
            queries.city = { $eq: req.query.cityId }
        }

        try {
            const itineraries = await Itinerary.find(queries)
                .populate('created_by')
                .populate('city')
                .populate('comments.user')

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
            queries.city = { $eq: req.query.cityId }
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
            const body = {
                city: typeof req.body.city === 'string' ? req.body.city : null,
                title: typeof req.body.title === 'string' ? req.body.title : null,
                price: typeof req.body.price === 'number' ? req.body.price : null,
                duration: typeof req.body.duration === 'number' ? req.body.duration : null,
                likes: typeof req.body.likes === 'number' ? req.body.likes : null,
                hashtags: Array.isArray(req.body.hashtags) ? req.body.hashtags.filter(tag => typeof tag === 'string') : null,
                comments: Array.isArray(req.body.comments) ? req.body.comments.map(comment => ({
                    user: typeof comment.user === 'string' ? comment.user : null,
                    itineraryId: typeof comment.itineraryId === 'string' ? comment.itineraryId : null,
                    comment: typeof comment.comment === 'string' ? comment.comment : null
                })) : null,
                activities: Array.isArray(req.body.activities) ? req.body.activities.map(activity => ({
                    photo: typeof activity.photo === 'string' ? activity.photo : null,
                    description: typeof activity.description === 'string' ? activity.description : null
                })) : null,
                created_by: typeof req.body.created_by === 'string' ? req.body.created_by : null
            };

            if (Object.values(body).some(value => value === null)) {
                res.status(400).json({ status: "error", message: "Wrong types of property." });
                return;
            }

            const updateItinerary = await Itinerary.updateOne({ _id: { $eq: req.params.id } }, body)

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
    },
    getComments: async (req, res) => {
        try {

            const commentsArray = await Itinerary.findById(req.params.id).populate('comments.user')

            if (commentsArray) {
                return res.status(200).json({
                    success: true,
                    commentsArray: commentsArray.comments
                })
            }

            return res.status(404).json({
                success: false,
                message: "Object not found"
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error while trying to post the comment.'
            })
        }
    },
    postComment: async (req, res) => {
        try {
            const newComment = {
                comment: req.body.comment,
                user: req.body.user,
                itineraryId: req.body.itineraryId
            };

            const postComment = await Itinerary.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { comments: newComment } },
                { new: true }
            )

            if (postComment) {
                return res.status(200).json({
                    success: true,
                    message: "The comment has been successfully posted."
                })
            }

            return res.status(404).json({
                success: false,
                message: "Object not found"
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error while trying to post the comment.'
            })
        }
    },
    postActivities: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error while trying to post the activities.'
            })
        }
    },
    deleteComment: async (req, res) => {
        try {
            const commentId = req.params.id;

            const oneComment = await Itinerary.findOneAndUpdate(
                { 'comments._id': commentId },
                { $pull: { comments: { _id: commentId } } },
                { new: true }
            )

            if (oneComment) {
                return res.status(200).json({
                    success: true,
                    message: 'Comment successfully deleted.'
                })
            }

            return res.status(404).json({
                success: false,
                message: 'Element not found.'
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error while trying to post the activities.'
            })
        }
    }
}

export default controller;