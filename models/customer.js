

const pool = require('../config/database');

class Customer {
    static async findAll() {
        try {
            const query = 'SELECT * FROM "customer"';
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error('Error querying users:', error);
            throw error;
        }
    }

    static async create(name,email,phone) {
        try {
            // Insert a new user into the database with values from req body
            const query = 'INSERT INTO "customer" (name,email,phone) VALUES ($1,$2,$3) RETURNING *';
            const values = [name,email,phone];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async findOne(customerid) {
        if (!customerid) {
            throw new Error('customerid is required');
        }
        try {
            let query = 'select * from "customer" where customerid=$1';
            const values = [customerid];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }

    static async delete(customerid) {
        if (!customerid) {
            throw new Error('customerid is required');
        }
        try {
            let query = 'delete from "customer" where customerid=$1';
            const values = [customerid];
            const { rows } = await pool.query(query, values);
            return values;
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }


    static async update(customerId, name,email,phone) {
        if (!customerId) {
            throw new Error('customerId is required');
        }
        try {
            let query = 'update "customer" set name=$2 ,email=$3 ,phone=$4 where customerid=$1';
            const values = [customerId,name,email,phone];
            const { rows } = await pool.query(query, values);
            return values;
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }

    
}

module.exports = Customer;
