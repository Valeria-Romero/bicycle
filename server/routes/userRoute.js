const express = require('express');
const UserRouter = express.Router();
const { UserController } = require( './../controllers/userController' );

UserRouter
    .route( '/login' )
    .post( UserController.userLogin );

UserRouter
    .route('/adduser')
    .post(UserController.createUser);

// UserRouter
//     .get( '/logout', UserController.userLogout );



module.exports = { UserRouter }