

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

    static async create(username, password, role) {
        try {
            const query = 'INSERT INTO "user" (username, password,role) VALUES ($1, $2,$3) RETURNING *';
            const values = [username, password, role];
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

    static async findByUserId(Userid){
        if(!Userid){
            throw new Error('Userid is required');
        }
        try{
            let query='select * from "user" where Userid=$1';
            const values=[Userid];
            const {rows} = await pool.query(query,values);
            return rows[0];
        }catch(error){
            console.error('Error logging user:', error);
            throw error;
        }
    }
}

module.exports = User;
