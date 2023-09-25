const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'your_username',
    password: 'your_password',
    database: 'your_database',
    host: 'localhost', // Your database host
    port: 5432,        // Default PostgreSQL port
    logging: false     // Disable logging SQL queries (optional)
});

module.exports = sequelize;
