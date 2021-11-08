const { SALT } = process.env;

var jwt = require('jsonwebtoken')

generateToken = (user) => {
    return jwt.sign({
        id: user.id, 
        name: user.name, 
        password: user.password, 
    }, SALT || 'somethingsecret', {
        expiresIn: '30s', 
    })
}

module.exports = generateToken;