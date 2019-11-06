exports.errorHandler = () => {
    return (err, req, res, next) => {
        switch (err.code) {
            case 'JWTERROR':
            case 'NOQMFOUND':
                res.status(401).json({ error: 'Something went wrong with authentication' })
                break
            case 'RESNOTFOUND':
                res.status(404).json({ error: 'Resource not found' })
                break
            case 'ROLEERR':
                res.status(401).json({ error: 'Your role does not alow this type usage for this resource ' })
                break
            default:
                next(err)
                break
        }
    }
}