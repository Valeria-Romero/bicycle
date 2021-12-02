const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 30
    },
    lastName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 30
    },
    email : {
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
    getUserById : function( email ){
        return User.findOne({ email });
    },
    deleteUserById : function( email ){
        return User.remove( { email } );
    },
    updateUser : function( email, userToUpdate ){
        return User.findOneAndUpdate( { email }, {$set : userToUpdate }, { new : true } )
    }
};

module.exports = {UserModel};