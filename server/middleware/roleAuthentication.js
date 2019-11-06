exports.roleAuthentication = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            const err = { code: 'ROLEERR' }
            next(err)
        } else {
            next()
        }
    }
}