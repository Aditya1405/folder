const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    //console.log('screen signup')
    console.log(req.body);
    const { phone } = req.body;
    try {
        //create a new user
        const user = new User({ phone });
        //here data validation takes place
        await user.save();
        res.send('you made a post request');
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

module.exports = router;