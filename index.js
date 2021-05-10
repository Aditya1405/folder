require('./src/models/User');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./src/routes/authRoutes');

const PORT = 5000;
const app = express();

//body parser is going to parse some data out from incoming request
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://aditya1405:aditya1405@cluster0.f2ita.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});
app.get('/', (req, res) => {
    res.send('hi there');
});

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})