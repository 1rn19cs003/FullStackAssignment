const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        
        res.status(500).send({message:'Server Error'});
    }
};

// Add more controller actions as needed.
