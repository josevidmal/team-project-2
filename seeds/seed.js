const sequelize = require('../config/connection');
const { User, Trips } = require('../models');

const userData = require('./userData.json');
const tripsData = require('./tripsData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const trips = await Trips.bulkCreate(tripsData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
