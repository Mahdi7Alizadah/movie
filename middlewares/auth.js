const jwt = require('jwt-simple');

exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token saknas.' });

    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Ogiltig token' });
    }
};

exports.authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Denied!' });
    }
    next();
};