//objective is to include jwt token in the request to proceed further if not send error
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

//if the user does have a jwt then we call next
module.exports = (req, res, next) => {
    //authoriztion === 'Bearer adfdsfdfdf'
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in' });
    }
    //extracting jwt from authorization
    const token = authorization.replace('Bearer ', '');
    console.log(token);
    //now validate token
    jwt.verify(token, 'HS256', async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in' });
        }
        //payload has the user_id that we have added in jwt at the time of sign in
        const { userId } = payload;
        //check whether the id is present in db if yes then return the user 
        const user = await User.findById(userId);
        //assigning this user to req object to allow uninterrupted access to protected pages
        req.user = user;
        //we are done with this middle ware and ready to call the next one
        next();
    });
}