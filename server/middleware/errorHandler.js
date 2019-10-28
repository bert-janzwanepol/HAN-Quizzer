exports.errorHandler = () => {
    return (err, req, res, next) => {
        console.log(err.code)
        switch (err.code) {
            case 'JWTERROR':
                res.status(401).json({ error: "Something went wrong with authentication" })
                break;
            default:
                next(err)
                break;
        }
    }
}