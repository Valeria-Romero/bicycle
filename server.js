require('./server/config/database');
const express = require('express');
const cors = require('cors');
const app = express();
const { UserRouter } = require('./server/routes/userRoute');
const flash = require('express-flash');



app.use(cors())

app.use( express.urlencoded({extended:true}) );
app.use( '', UserRouter)
app.use(express.json());
app.use( flash());

app.listen( 8080, function(){
    console.log( "Bicycle market place is running in port 8080." );
});