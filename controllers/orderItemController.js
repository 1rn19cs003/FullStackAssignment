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
                if (orderItem) {
                    const updatedBookQuantity = parseInt(checkBookId.quantityinstock) - parseInt(checkOrderId.quantity);
                    res.status(200).send(orderItem);
                } else {
                    res.status(201).send({ message: "Order Item Not created Due to some internal error" });
                }
                //update the book quantity in stock after adding to cart
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
        if (orderItem) {
            res.status(200).send(orderItem);
        } else {
            res.status(201).send({ message: "Order Item Id is invalid" });
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}


exports.deleteOrderItems = async (req, res) => {
    try {
        let OrderItemId = req.params.OrderItemId;
        const orderItem = await OrderItems.delete(OrderItemId);
        if (orderItem) {
            res.status(200).send(orderItem);
        } else {
            res.status(201).send({ message: "Order Item Id is invalid" });
        }
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
