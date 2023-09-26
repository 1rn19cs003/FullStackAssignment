const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const Utils = require('../utils/decodeToken');
const Customer = require('../models/customer');
const User = require('../models/user');

exports.getAllCustomer = async (req, res) => {
    try {
        const customer = await Customer.findAll();
        res.status(200).send(customer);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
};


exports.createCustomer = async (req, res) => {
    try {
        let k = req.body;
        const checkUser = await User.findByUserId(k.customerId);
        if (checkUser) {
            const checkEmail=await Utils.validateEmail(k.email);
            if (checkEmail){
                const customer = await Customer.create(k.customerId, k.name, k.email, k.phone);
                res.status(200).send(customer);
            }else{
                res.status(201).send({ message: "Email is invalid" });
            }
        } else {
            res.status(201).send({ message: "User Not Found" });
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}

exports.getByCustomerId = async (req, res) => {
    try {
        let customerId = req.params.customerId;
        const customer = await Customer.findOne(customerId);
        res.status(200).send(customer);
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}


exports.deleteCustomer = async (req, res) => {
    try {
        let customerId = req.params.customerId;
        const customer = await Customer.delete(customerId);
        res.status(200).send(customer);
    } catch (err) {
        console.log('error', err);
        res.status(500).send({ message: 'server error' });
    }

}

exports.updateCustomer = async (req, res) => {
    try {
        let customerId = req.params.customerId;
        let k = req.body;
        const customer = await Customer.update(customerId, k.name, k.email, k.phone);
        res.status(200).send(customer);
    } catch (err) {
        console.log('error', err);
        res.status(500).send({ message: 'server error' });
    }
}
