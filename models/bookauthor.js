

const pool = require('../config/database');


class BookAuthor {
    static async findAll() {
        try {
            const query = 'SELECT * FROM "autherBooks"';
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error('Error querying users:', error);
            throw error;
        }
    }

    static async create(authorId,bookId) {
        try {
            // Insert a new user into the database with values from req body

            const query = 'INSERT INTO "autherBooks" (Authorid,Bookid) VALUES ($1,$2) RETURNING *';
            const values = [authorId,bookId];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async findOne(authorid) {
        if (!authorid) {
            throw new Error('authorid is required');
        }
        try {
            let query = 'select * from "autherBooks" where authorid=$1';
            const values = [authorid];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }

    static async delete(authorid) {
        if (!authorid) {
            throw new Error('authorid is required');
        }
        try {
            let query = 'delete from "autherBooks" where authorid=$1';
            const values = [authorid];
            const { rows } = await pool.query(query, values);
            return values;
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }


    static async update(authorId, name) {
        if (!authorId) {
            throw new Error('bookId is required');
        }
        try {
            let query = 'update "autherBooks" set name=$1';
            const values = [name];
            const { rows } = await pool.query(query, values);
            return values;
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }


}

module.exports = BookAuthor;
