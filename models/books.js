

const pool = require('../config/database');


class Books {
    static async findAll() {
        try {
            const query = 'SELECT * FROM "Books"';
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error('Error querying users:', error);
            throw error;
        }
    }

    static async create(title, isbn, price, QuantityInStock) {
        try {
            // Insert a new user into the database with values from req body

            const query = 'INSERT INTO "Books" (title, isbn, price, QuantityInStock) VALUES ($1, $2,$3,$4) RETURNING *';
            const values = [title, isbn, price, QuantityInStock];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async findOne(bookid) {
        if (!bookid) {
            throw new Error('bookId is required');
        }
        try {
            let query = 'select * from "Books" where bookid=$1';
            const values = [bookid];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }

    static async delete(bookid) {
        if (!bookid) {
            throw new Error('bookId is required');
        }
        try {
            let query = 'delete from "Books" where bookid=$1';
            const values = [bookid];
            const { rows } = await pool.query(query, values);
            return values;
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }


    static async update(bookId, title, isbn, price, QuantityInStock) {
        if (!bookId) {
            throw new Error('bookId is required');
        }
        try {
            let query = 'update "Books" set title=$1, isbn=$2, price=$3, QuantityInStock=$4 where bookid=$5';
            const values = [title, isbn, price, QuantityInStock, bookId];
            const { rows } = await pool.query(query, values);
            return values;
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }
}

module.exports = Books;
