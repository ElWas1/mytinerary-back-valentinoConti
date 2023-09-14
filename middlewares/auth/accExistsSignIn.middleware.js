import User from '../../models/User.js';

export const accExistsSignIn = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
        req.user = {
            id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password,
            image: user.image,
            country: user.country,
            online: user.online,
            verified: user.verified
        }
        return next();
    }

    return res.status(400).json({
        success: false,
        message: 'User is not registered.'
    })
}