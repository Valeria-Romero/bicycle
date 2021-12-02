const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 30
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});

const User = mongoose.model( 'users', UserSchema );

const UserModel = {
    createUser : function( newUser ){
        return User.create( newUser );
    },
    getUsers : function(){
        return User.find();
    },
    getUserById : function( username ){
        return User.findOne({ username });
    },
    deleteUserById : function( username ){
        return User.remove( { username } );
    },
    updateUser : function( username, userToUpdate ){
        return User.findOneAndUpdate( { username }, {$set : userToUpdate }, { new : true } )
    }
};

module.exports = {UserModel};