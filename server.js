const express = require('express');
const session = require( 'express-session' );
const cors = require('cors');
const { UserRouter } = require('./server/routes/userRoute');
const { UserModel } = require('./server/models/userModel')
const flash = require('express-flash');


const app = express();
app.use(cors())
app.use( express.urlencoded( {extended:true}));
app.use(express.json());
app.use( flash());

require('./server/config/database');

app.use( '', UserRouter)


app.listen( 8080, function(){
    console.log( "Belt exam is running in port 8080." );
});