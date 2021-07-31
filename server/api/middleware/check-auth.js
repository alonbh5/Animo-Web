const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('authorization Failed!');
        }
        const decodedToken = jwt.verify(token, 'supersecret');
        req.userData = { userId: decodedToken.userId, roleId: decodedToken.roleId }
        next();
    } catch (err) {
        res.status(401).send('Authorization failed!')
    }

}