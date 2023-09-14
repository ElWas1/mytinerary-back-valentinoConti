export const accHasBeenVerified = async (req, res, next) => {
    if(req.user.verified) {
        return next();
    }

    return res.status(400).json({
        success: false,
        message: 'User has not verified their account.'
    })
}