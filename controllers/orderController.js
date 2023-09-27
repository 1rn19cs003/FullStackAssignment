const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const Utils = require('../utils/decodeToken');
const Orders = require('../models/orders');
const Customer = require('../models/customer');

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.findAll();
        res.status(200).send(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
};


exports.createOrder = async (req, res) => {
    try {
        let k = req.body;
        const checkCustomer = await Customer.findOne(k.CustomerID);
        console.log(checkCustomer);
        if (checkCustomer) {
            const orders = await Orders.create(k.CustomerID, k.OrderDate, k.quantity);
            if (orders) {
                res.status(200).send(orders);
            } else {
                res.status(201).send({ message: "Order Not created Due to some internal error" });
            }
        } else {
            res.status(201).send({ message: "Customer Not Found" });
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}

exports.getByOrderId = async (req, res) => {
    try {
        let OrderId = req.params.OrderId;
        const orders = await Orders.findOne(OrderId);
        if (orders) {
            res.status(200).send(orders);
        } else {
            res.status(201).send({ message: "Order Id is invalid" });
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}


exports.deleteOrder = async (req, res) => {
    try {
        let OrderId = req.params.OrderId;
        const orders = await Orders.delete(OrderId);
        if (orders) {
            res.status(200).send(orders);
        } else {
            res.status(201).send({ message: "Order Id is invalid" });
        }
    } catch (err) {
        console.log('error', err);
        res.status(500).send({ message: 'server error' });
    }

}

exports.updateOrder = async (req, res) => {
    try {
        let OrderId = req.params.OrderId;
        let k = req.body;
        const orders = await Orders.update(OrderId, k.CustomerID, k.OrderDate, k.quantity);
        if (orders) {
            res.status(200).send(orders);
        } else {
            res.status(201).send({ message: "Order Id is invalid" });
        }
    } catch (err) {
        console.log('error', err);
        res.status(500).send({ message: 'server error' });
    }
}
