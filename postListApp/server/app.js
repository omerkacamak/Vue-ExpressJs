const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const router = require('./router/router')

const app = express();
app.use(cors())
app.use(express.json());
dotenv.config();

app.use('/posts',router)

app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(result=>{
        console.log('connected to db')
    })
    .catch(err=>{
        console.log('connect is error')
    })
    
})