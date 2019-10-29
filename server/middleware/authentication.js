const jwt = require('jsonwebtoken')

const excludeAuthPaths = [
    '/quizmaster/login'
]

exports.authentication = () => {
    return (req, res, next) => {
        if (excludeAuthPaths.includes(req.url)) {
            next()
        } else {
            try {
                const token = req.get('token')
                req.user = jwt.verify(token, process.env.JWT_SECRET)
                next()
            } catch (err) {
                err.code = 'JWTERROR'
                next(err)
            }
        }
    }
}