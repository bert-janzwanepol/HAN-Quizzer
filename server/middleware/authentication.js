const jwt = require('jsonwebtoken')

exports.authentication = () => {
    var authmd = (req, res, next) => {
        try {
            // const token = req.get('token')
            const token = req.body.token;
            req.user = jwt.verify(token, process.env.JWT_SECRET)
            next()
        } catch (err) {
            err.code = 'JWTERROR'
            next(err)
        }
    }

    authmd.unless = require('express-unless')
    return authmd
}