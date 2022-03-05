// REQUIRES PACKAGES TO USE
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers/index');
const helpers = require('./utils/helpers');
const helmet = require("helmet");
const bodyParser = require("body-parser");

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// SETS APP TO EXPRESS AND PORT
const app = express();
const PORT = process.env.PORT || 3001;

// CREATE HANDLEBAR HELPERS 
const hbs = exphbs.create({ helpers });

// STARTS A SESSION
const sess = {
    secret: 'Very complex secret',
    cookie: {
        maxAge: 86400,
        expires: 600000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// STARTS HELMET TO SHIELD THE APP
app.use(helmet());
app.use(session(sess));

app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// STARTS THE SERVER
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});