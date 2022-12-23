require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const RouteUser = require('./Routes/User.js');
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.set('strictQuery', false);

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    // useFindAndModify: false,
    // useCreateIndex: true
})

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', RouteUser)


app.listen(process.env.PORT, (req,res) => {
    console.log(`server is running ${process.env.PORT}`)
})