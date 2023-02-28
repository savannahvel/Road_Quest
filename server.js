require('dotenv').config();
const path = require('path');
const express = require('express');

const session = require('express-session');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const withauth = require('./utils/auth');
const routes = require('./controllers');


const app = express();
const hbs = exphbs.create();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.DB_SESSIONSECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store:  new SequelizeStore({
        db: sequelize
      })
};



app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Visit http://localhost:${PORT} and start planning your next trip!🚗`));
  });