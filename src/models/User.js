const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        unique: true,
        require: true
    }
});

mongoose.model('User', userSchema);