const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})


/*
We can use normal try and catch block but in postgress
there is one problem while working with online-databse that it 
mighth try to reconnect if you are not using your server 
so to prevent from that we again and agin try to connect in config file 
to aviod any Miss operations of Query
*/

const connectWithRetry = () => {
    console.log('Connecting to the database...');
    pool.connect((err, client, release) => {
        if (err) {
            console.error('Database connection error:', err);
            setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
        } else {
            console.log('Connected to the database');
            release(); // Release the connection
        }
    });
};

connectWithRetry();


module.exports = pool;
