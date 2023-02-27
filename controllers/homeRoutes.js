const router = require('express').Router();
const { User, Trips, Markers } = require('../models');
const sequelize = require('../config/connection');
const exp = require('constants');

//sign in page
router.get('/', async (req, res) => {
    // if (req.session.logged_in) {
    //     res.redirect('/');
    //     return;
    // }
    res.render('login', {
        style: 'signin.css',
        script: 'login.js'
    })
});

// redirects user to homepage once logged in
router.get('/login', (req, res) => {
    console.log(req.session);
    if (req.session.logged_in) {
        console.log(req.session);
        res.redirect('/');
        return;
    }
    res.render('login', {
        style: 'signin.css',
        script: 'login.js'
    })
});

// sign up page
router.get('/signup', (req, res) => {
    res.render('signup');
});
    module.exports = router;