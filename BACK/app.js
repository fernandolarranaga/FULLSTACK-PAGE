const express = require('express');
const cors = require('cors');


require('dotenv').config();
require('./config/db');

const app = express();
app.use(cors());

//config
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// get 

app.use('/api', require('./routes/api'));

const PORT= process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server ok on the port ${PORT}`);
});