// add middlewares here related to projects

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`${timestamp}, ${method}, ${url}`)
    next();
  }

function validateProject (req, res, next) {
    if (!req.body.name || !req.body.description || req.body.completed === undefined ) {
        return res.status(400).json({ message: "Missing name/description" })
    }
    next();
}

module.exports = {
    logger,
    validateProject
}