const { UserModel } = require( './../models/userModel' );
const bcrypt = require( 'bcrypt' );

const UserController = {

    loadLogin : function( request, response ){
        response.render( 'login' );
    },
    createUser : function( request, response ){
        
        // function validateEmail(email) {
        //     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return re.test(String(email).toLowerCase());
        // }
        console.log(request.body);
        
        const email = request.body.email;
        const firstName = request.body.firstName;
        const lastName = request.body.lastName;
        const password = request.body.password;
        const confirmPass = request.body.confirmPassword;
    
        console.log("first",firstName, "last",lastName, "email",email,  "pass",password, "confirm",confirmPass);
        // if(firstName === null || lastName === null || email === null || password === null || confirmPass === null || firstName.length < 2 || lastName.length < 2 || !validateEmail(email) || password !== confirmPass){
        
        //     if(firstName === null || lastName === null || email === null || password === null || confirmPass === null ){
        //         request.flash('registration', 'You can not leave empty spaces');
        //     }
        //     else{
        //         if(firstName.length < 2 || lastName.length < 2){
        //             request.flash('length', 'First name and last name can not be less than 2 characters');
        //         }
        
        //         if(!validateEmail(email)){
        //             request.flash('email', 'invalid email');
        //         }
    
        //         if(password !== confirmPass){
        //             request.flash('password', "The passwords didn't match");
        //         }
        //     }
        //     response.redirect('/');
        // }
    
        // else{
        //     bcrypt.hash( password, 10 )
        //         .then( encryptedPassword => {
        //             const newUser = {
        //                 email,
        //                 firstName,
        //                 lastName,
        //                 password : encryptedPassword
        //             };
        //             console.log( newUser );
        //             UserModel
        //                 .createUser( newUser )
        //                 .then( result => {
        //                     request.session.firstName = result.firstName;
        //                     request.session.lastName = result.lastName;
        //                     request.session.userName = result.userName;
        //                     response.redirect( '/users/landing' );
        //                 })
        //                 .catch( err => {
        //                     request.flash( 'registration', 'That email is already in use!' );
        //                     response.redirect( '/users/login' );
        //                 });
        //         });
        // }
    },
    userLogin : function( request, response ){
        let email = request.body.loginUserName;
        let password = request.body.loginPassword;
    
        if(email === '' || password === ''){
            request.flash('login', 'You leaved a empty space')
            response.redirect( '/' );
        }

        else{
            UserModel
            .getUserByEmail( email )
            .then( result => {
                console.log( "Result", result );
                if( result === null ){
                    request.flash( 'user', "Invalid user!" );
                }

                bcrypt.compare( password, result.password )
                    .then( flag => {
                        if( !flag ){
                            request.flash( 'wrongpassword', "Wrong Password!" );
                            throw new Error( "Wrong Password!" );
                        }
                        request.session.firstName = result.firstName;
                        request.session.lastName = result.lastName;
                        request.session.email = result.email;
                        console.log(flag);
                        response.redirect( '/dashboard' );
                    })
                    .catch( error => {
                        response.redirect( '/' );
                    }); 
            })
            .catch( error => {
                response.redirect( '/' );
            });   
        }
    },
    userLogout : function( request, response ){
        request.session.destroy();
        response.redirect( '/users/login' ); 
    },
    getUserByEmail : function( request, response ){
        let email = request.session.email;
        UserModel
            .getUserById( email )
            .then( result => {
                if( result === null ){
                    throw new Error( "That user doesn't exist" );
                }
                response.render( 'user', { found: true, user: result } );
            })
            .catch( error => {
                response.render( 'user', { found: false } );
            });
    }
}


module.exports = { UserController };