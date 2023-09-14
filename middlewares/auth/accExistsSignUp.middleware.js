import User from '../../models/User.js';

export const accExistsSignUp = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).json({
            success: false,
            message: 'User already registered!'
        })
    };

    next();
}

export default accExistsSignUp;