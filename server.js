const express = require('express');
const app = express();
const mongoose =  require('mongoose');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running at port: ${port}`)
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true,  useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',() => {
    console.log('Mongodb connection established successfully')
});

const userRouter =  require('./router/user');

app.use('/user', userRouter);