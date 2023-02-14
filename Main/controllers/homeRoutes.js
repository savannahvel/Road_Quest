const router = require('express').Router();


// all pages you see when not logged in

//sign in page
router.get('/', async (req, res) => {
    res.render('login')
})

module.export = router;