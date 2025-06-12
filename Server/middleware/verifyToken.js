const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        console.log('Token Failed: No token found');
        return res.json({ msg: "No token found", status: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.jwtSecretkey);
        req.user = decoded;
        next();
    } catch (err) {
        console.log('Token Failed: Invalid or expired');
        return res.json({ msg: "Invalid or expired token", status: false });
    }
};

module.exports = verifyToken;
