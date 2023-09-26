

const pool = require('../config/database');


class OrderItems {
    static async findAll() {
        try {
            const query = 'SELECT * FROM "OrderItems"';
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error('Error querying users:', error);
            throw error;
        }
    }

    static async create(OrderID, bookId, quantity) {
        try {
            // Insert a new user into the database with values from req body

            const query = 'INSERT INTO "OrderItems" (OrderID,bookId,quantity) VALUES ($1, $2,$3) RETURNING *';
            const values = [OrderID, bookId, quantity];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async findOne(orderItemId) {
        if (!orderItemId) {
            throw new Error('orderItemId is required');
        }
        try {
            let query = 'select * from "OrderItems" where orderItemId=$1';
            const values = [orderItemId];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }

    static async delete(orderItemId) {
        if (!orderItemId) {
            throw new Error('orderItemId is required');
        }
        try {
            let query = 'delete from "OrderItems" where orderItemId=$1';
            const values = [orderItemId];
            const { rows } = await pool.query(query, values);
            return values;
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }


    static async update(orderItemId, OrderID, bookId, quantity) {
        if (!orderItemId) {
            throw new Error('orderItemId is required');
        }
        try {
            let query = 'update "OrderItems" set OrderID=$2, bookId=$3, quantity=$4 where orderItemId=$1';
            const values = [orderItemId,OrderID, bookId, quantity];
            const { rows } = await pool.query(query, values);
            return values;
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }  
}

module.exports = OrderItems;
