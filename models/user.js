// // const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const User = sequelize.define('User', {
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     }
// });

// module.exports = User;

const pool = require('../config/database');

// Define the User model using pg-promise
class User {
    static async findAll() {
        try {
            const query = 'SELECT * FROM users'; // Replace 'users' with your actual table name
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error('Error querying users:', error);
            throw error;
        }
    }

    static async create(username, email) {
        try {
            const query = 'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *';
            const values = [username, email];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Add more model methods as needed
}

module.exports = User;
