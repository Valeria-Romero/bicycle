const express = require('express');
const session = require( 'express-session' );
const cors = require('cors');
const { UserRouter } = require('./server/routes/userRoute');
const { PollRouter } = require('./server/routes/pollRoute');
const path = require('path');


const app = express();
app.use(cors())
app.use( express.urlencoded( {extended:true}));
app.use(express.json());

require('./server/config/database');

app.use( '', UserRouter)
app.use( '/poll', PollRouter )


app.listen( 8080, function(){
    console.log( "Belt exam is running in port 8080." );
});