const router = require('express').Router();
const { Users, Trips, Markers } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', (req, res) => {
//     Post.findAll({
//         include: [
//             {
//                 model: Users
//             }
//         ]
//     }).then((posts) => {
//         console.log(posts);
//         posts = posts.map((post) => post.get({ plain: true }));
//         res.render('home', { posts });
//     });
// });

// router.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect('/');
//         return;
//     }
//     res.render('login');
// });

// router.get('/signup/', (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect('/');
//         return;
//     }
//     res.render('signup');
// });

// router.get('/trips/:id', (req, res) => {
//     Post.findOne({
//         where: {
//             id: req.params.id
//         },
//         include: [
//             {
//                 model: User
//             },
//             {
//                 model: Trips
//             }
//         ]
//     }).then((post) => {
//         if (!post) {
//             res.status(404).json({ message: 'No trip found with this id' });
//             return;
//         }
//         post = post.get({ plain: true });
//         res.render('edit-trip', { Trips });
//     });
// });

// router.get('/dashboard', withAuth, (req, res) => {
//     Post.findAll({
//         where: {
//             user_id: req.session.user_id
//         },
//         include: [
//             {
//                 model: Users
//             }
//         ]
//     }).then((posts) => {
//         posts = posts.map((post) => post.get({ plain: true }));
//         res.render('dashboard', { posts });
//     });
// });

// router.get('/trips/:id', withAuth, (req, res) => {
//     Post.findOne({
//         where: {
//             id: req.params.id
//         },
//         include: [
//             {
//                 model: Users
//             },
//             {
//                 model: Trips
//             }
//         ]
//     }).then((post) => {
//         if (!post) {
//             res.status(404).json({ message: 'No trip found with this id' });
//             return;
//         }
//         post = post.get({ plain: true });
//         console.log(Trips)
//         res.render('Trips', { Trips });
//     });
// });

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

module.exports = router;
