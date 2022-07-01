const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
const compression = require("compression");

// Initialise the app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded());

// Import routes
const loginRoute = require('./src/routes/login');
const signupRoute = require('./src/routes/login');

app.use(morgan("dev"));
app.use(cors());
app.use(compression());

mongoose.connect('mongodb://localhost:27017/database', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.on('error', (err)=>{
    console.log(err)
})

db.once('open', () =>{
    console.log('Db Connection Established!')
}) 


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

// Send message for default URL
app.get('/', (req, res) => res.send('I AM ALIVE!'));

app.use('/api', loginRoute);
app.use('/api', signupRoute);

app.listen(PORT, ()=>{
    console.log('Server is running on port ' +PORT)
})