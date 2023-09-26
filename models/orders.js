

const pool = require('../config/database');


class Order {
    static async findAll() {
        try {
            const query = 'SELECT * FROM "Orders"';
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error('Error querying users:', error);
            throw error;
        }
    }

    static async create(CustomerID,OrderDate,TotalAmount) {
        try {
            // Insert a new user into the database with values from req body
            const query = 'INSERT INTO "Orders" (CustomerID,OrderDate,TotalAmount) VALUES ($1,$2,$3) RETURNING *';
            const values = [CustomerID, OrderDate, TotalAmount];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async findOne(orderId) {
        if (!orderId) {
            throw new Error('orderId is required');
        }
        try {
            let query = 'select * from "Orders" where OrderId=$1';
            const values = [orderId];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }

    static async delete(orderId) {
        if (!orderId) {
            throw new Error('orderId is required');
        }
        try {
            let query = 'delete from "Orders" where OrderId=$1';
            const values = [orderId];
            const { rows } = await pool.query(query, values);
            return values;
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }


    static async update(OrderId,CustomerID, OrderDate, TotalAmount) {
        if (!OrderId) {
            throw new Error('OrderId is required');
        }
        try {
            let query = 'update "Orders" set CustomerID=$2 ,OrderDate=$3 ,TotalAmount=$4 where OrderId=$1';
            const values = [OrderId, CustomerID, OrderDate, TotalAmount];
            const { rows } = await pool.query(query, values);
            return values;
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }

}

module.exports = Order;
