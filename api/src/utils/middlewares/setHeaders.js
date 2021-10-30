function setHeaders (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    next();
}   

module.exports = setHeaders;