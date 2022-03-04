// REQUIRES FOR PACKAGES TO USE
const Sequelize = require('sequelize');
require('dotenv').config();

// SAVE SEQUELIZE TO A VARIABLE
let sequelize;

// START SEQUELIZE
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );   
}


// EXPORT MODULES
module.exports = sequelize;