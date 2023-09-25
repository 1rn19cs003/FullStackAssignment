const User = require('../models/user');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        // res.json(users);
        res.status(200).send({ message: "Your backend is working fine ", data: users });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        console.log("user logged in sucessfully");
    } catch (error) {
        res.status(500).send({ message: 'server error' });
    }
}

exports.createUser = async (req, res) => {
    try {
        const users = await User.create(req.username ,req.password,req.role);
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}

// Add more controller actions as needed.
