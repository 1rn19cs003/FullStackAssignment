const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const Utils = require('../utils/decodeToken');

exports.getUsers = async (req, res) => {
    try {
        // const authToken = req.cookies.authToken;
        // console.log(authToken);
        // const decodedInfo = await Utils.decodeToken(authToken, secretKey);
        // console.log(decodedInfo);
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        let k = req.body;
        const users = await User.findOne(k.username, k.password, k.Role)
        if (users) {
            const token = jwt.sign({ Id: users.userid, username: users.username, role: users.role }, secretKey, {
                expiresIn: '24h',
            });

            res.cookie('authToken', token, { httpOnly: true });
            res.status(200).send({ message: "User logged in sucessfully", data: users });
        } else {
            res.status(201).send({ message: "User Not Found" });
        }
    } catch (error) {
        res.status(500).send({ message: 'server error' });
    }
}

exports.createUser = async (req, res) => {
    try {
        let k = req.body;
        const users = await User.create(k.username, k.password, k.Role);
        res.status(200).send(users);
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}


exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('authToken');
        res.status(200).send({ message: "User logged out sucessfully" });
    } catch (error) {
        res.status(500).send({ message: "server error" });
    }
}

exports.test=async(req,res)=>{
    try{
        res.status(200).send({message:"Test"});
    }catch(error){
        res.status(500).send({message:"Server Error"});
    }
}

