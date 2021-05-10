const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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
        //signing key of jwt = 'HS256'
        const token = jwt.sign({ userId: user._id }, 'HS256');
        res.send({ token: token });
    } catch (err) {
        //error handling for user inputs
        return res.status(422).send(err.message);
    }
});

router.post('/signin', async (req, res) => {
    //when user signs in we expect a phone num from the user input
    const { phone } = req.body;
    if (!phone) {
        return res.status(422).send({ error: "Must provide phone num " })
    }
    //we need to pick a user from the supplied phone
    const user = await User.findOne({ phone: phone });
    if (!user) {
        return res.status(404).send({ error: 'phone not found' });
    }
    const token = jwt.sign({ userId: user._id }, 'HS256');
    res.send({ token });
});

module.exports = router;