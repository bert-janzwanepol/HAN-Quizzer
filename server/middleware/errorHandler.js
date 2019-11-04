exports.errorHandler = () => {
    return (err, req, res, next) => {
        switch (err.code) {
            case 'JWTERROR' || 'NOQMFOUND':
                res.status(401).json({ error: "Something went wrong with authentication" })
                break
            case 'RESNOTFOUND':
                res.status(404).json({ error: "Resource not found" })
                break
            default:
                next(err)
                break
        }
    }
}