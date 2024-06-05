const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Ogiltig e-post, lösenord' });
        }
        const token = jwt.encode({ userId: user._id, role: user.role }, process.env.JWT_SECRET, 'HS256');
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
