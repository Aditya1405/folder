const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) => {
    console.log('screen signup')
    res.send('you made a post request');
});

module.exports = router;