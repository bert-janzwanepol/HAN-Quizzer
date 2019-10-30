exports.errorHandler = () => {
    return (err, req, res, next) => {
        switch (err.code) {
            case 'JWTERROR' || 'NOQMFOUND':
                res.status(401).json({ error: "Something went wrong with authentication" })
                break;
            default:
                next(err)
                break;
        }
    }
}