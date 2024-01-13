import User from '../../models/User.js';

export const accExistsSignUp = async (req, res, next) => {
    const user = await User.findOne({ email: { $eq: req.body.email } });

    if (user) {
        return res.status(400).json({
            success: false,
            message: 'User already registered!'
        })
    };

    const userByUsername = await User.findOne({ username: { $eq: req.body.username } });

    if (userByUsername) {
        return res.status(400).json({
            success: false,
            message: 'Username is not available!'
        })
    };

    next();
}

export default accExistsSignUp;