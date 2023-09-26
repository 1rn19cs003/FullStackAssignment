const { Pool } = require('pg');
require('dotenv').config();

// const sequelize = new Sequelize({
//     dialect: 'postgres',
//     username: 'your_username',
//     password: 'your_password',
//     database: 'your_database',
//     host: 'localhost', // Your database host
//     port: 5432,        // Default PostgreSQL port
//     logging: false     // Disable logging SQL queries (optional)
// });

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})
try {
    pool.connect((err) => {
        if (err) {
            console.log('PostgreSQL URL:', process.env.POSTGRES_URL);
            console.log("Error connecting to database", err);
        }
        else {
            //to get information about the vercel database
            //console.log(pool)
            console.log("Database connection established");
        }
    })
} catch (error) {
    console.error("Unable to connect to the database:", error);
}


module.exports = pool;
