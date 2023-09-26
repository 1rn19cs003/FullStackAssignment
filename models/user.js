

const pool = require('../config/database');

""
class User {
    static async findAll() {
        try {
            const query = 'SELECT * FROM "user"'; 
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error('Error querying users:', error);
            throw error;
        }
    }

    static async create(username, email, role) {
        try {
            const query = 'INSERT INTO "users" (username, email,role) VALUES ($1, $2,$3) RETURNING *';
            const values = [username, email, role];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async findOne(username, password, role) {
        if (!username || !password) {
            throw new Error('username and password are required');
        }
        try {
            let query='select * from "user" where username=$1 AND password =$2 AND role=$3 ';
            const values=[username,password,role];
            const {rows} = await pool.query(query,values);
            return rows[0];
        } catch (error) {
            console.error('Error logging user:', error);
            throw error;
        }
    }

    // Add more model methods as needed
}

module.exports = User;
