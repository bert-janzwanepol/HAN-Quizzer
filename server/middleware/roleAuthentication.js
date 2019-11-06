exports.roleAuthentication = role => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            const err = { code: 'ROLEERR' }
            next(err)
        } else {
            next()
        }
    }
}