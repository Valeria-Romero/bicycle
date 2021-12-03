const { UserModel } = require( './../models/userModel' );
const bcrypt = require( 'bcrypt' );

const UserController = {

    createUser : function( request, response ){
        
        console.log(request.body);
        
        const username = request.body.username;
        const firstName = request.body.firstName;
        const password = request.body.password;
        const confirmPass = request.body.confirmPassword;
        
        var errors = {EmptySpace:false, Size:false, usernameTaken:false, PassMatch:false};
        if(firstName === '' ||  username === '' || password === '' || confirmPass === '' || password !== confirmPass){
        

            if(firstName === '' || username === '' || password === '' || confirmPass === '' ){
                errors.EmptySpace = true;
            }
            else{
                if(firstName.length < 3 || lastName.length < 3){
                    errors.Size = true;
                }
        
                if(UserModel.getUserById(username) != null){
                    errors.usernameTaken = true;
                }
    
                if(password !== confirmPass){
                    errors.PassMatch = true;
                }
            }
            response.status(200).json(errors).end();
        }
    
        else{
            bcrypt.hash( password, 10 )
                .then( encryptedPassword => {
                    const newUser = {
                        firstName,
                        username,
                        password : encryptedPassword
                    };
                    console.log( newUser );
                    UserModel
                        .createUser( newUser )
                        .then( result => {
                            response.status(200).json({message: "User created successfully!"});
                        })
                        .catch( err => {
                            response.status(200).json({message: "Username taken :("});
                        });
                });
        }
    },

    userLogin : function( request, response ){
        let username = request.body.username;
        let password = request.body.password;
        console.log(request.body);
        UserModel
        .getUserById( username )
        .then( result => {
            console.log( "Result", result )
            if( result === null ){
                throw new Error()
            }
            bcrypt.compare( password, result.password )
                .then( flag => {
                    if( !flag ){
                        throw new Error();
                    }
                    console.log('validation success');
                    response.status(200).json(result)
                })
                .catch( error => {
                    console.log("Wrong password");
                    response.json(Error).end();
                }); 
        })
        .catch( err =>{
            response.json(Error).end();
        })
        
        
        } 
        
    
    
        
    
    // userLogout : function( request, response ){
    //     request.session.destroy();
    //     response.redirect( '/users/login' ); 
    // }
}


module.exports = { UserController };