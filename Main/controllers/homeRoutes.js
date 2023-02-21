const router = require('express').Router();
const { User, Trips, Markers } = require('../models');
const sequelize = require('../config/connection');
const exp = require('constants');

// redirects user to homepage once logged in
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// sign up page
router.get('/signup', (req, res) => {
    res.render('signup');
});
module.exports = router;