const express = require('express');
const UserRouter = express.Router();
const { UserController } = require( './../controllers/userController' );

UserRouter
    .route( '/login' )
    .get( UserController.loadLogin )
    .post( UserController.userLogin );

UserRouter
    .post( '/adduser', UserController.createUser);
UserRouter
    .get( '/logout', UserController.userLogout );

UserRouter
    .get( '/getByEmail', UserController.getUserByEmail );

module.exports = {UserRouter }