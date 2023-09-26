const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const Utils = require('../utils/decodeToken');
const OrderItems = require('../models/orderItems');
const Order = require('../models/orders');
const Books = require('../models/books');

exports.getAllOrderItems = async (req, res) => {
    try {
        const orderItem = await OrderItems.findAll();
        res.status(200).send(orderItem);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
};


exports.createOrderItems = async (req, res) => {
    try {
        let k = req.body;
        const checkOrderId = await Order.findOne(k.OrderID);
        const checkBookId = await Books.findOne(k.bookId); 
        if (checkOrderId && checkBookId) {
            if (parseInt(checkOrderId.quantity) <= parseInt(checkBookId.quantityinstock)) {
                const TotalAmount = parseInt(checkOrderId.quantity) * parseFloat(checkBookId.price);
                const orderItem = await OrderItems.create(k.OrderID, k.bookId, TotalAmount);
                //update the book quantity in stock after adding to cart
                const updatedBookQuantity = parseInt(checkBookId.quantityinstock) - parseInt(checkOrderId.quantity);
                const updatedBook = await Books.update(k.bookId, checkBookId.title,checkBookId.isbn, checkBookId.price, updatedBookQuantity);
                
                res.status(200).send(orderItem);
            } else {
                res.status(201).send({ message: "Order Quantity is greater than Book Quantity" });
            }
        } else {
            res.status(201).send({ message: "Order or Book Id is invalid" });
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}

exports.getByOrderItemId = async (req, res) => {
    try {
        let OrderItemId = req.params.orderItemId;
        const orderItem = await OrderItems.findOne(OrderItemId);
        res.status(200).send(orderItem);
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}


exports.deleteOrderItems = async (req, res) => {
    try {
        let OrderItemId = req.params.OrderItemId;
        const orderItem = await OrderItems.delete(OrderItemId);
        res.status(200).send(orderItem);
    } catch (err) {
        console.log('error', err);
        res.status(500).send({ message: 'server error' });
    }

}

exports.updateOrderItem = async (req, res) => {
    try {
        let OrderItemId = req.params.orderItemId;
        let k = req.body;
        const orderItem = await OrderItems.update(OrderItemId, k.orderid, k.bookid, k.TotalAmount);
        res.status(200).send(orderItem);
    } catch (err) {
        console.log('error', err);
        res.status(500).send({ message: 'server error' });
    }
}
