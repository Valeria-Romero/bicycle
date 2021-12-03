const { Console } = require('console');
const { response } = require('express');
const { PollModel } = require( './../models/pollModel' )

const PollController = {
    createNewPoll: function(request, response){
        const question = request.body.question;
        const option1 = request.body.option1;
        const option2 = request.body.option2;
        const option3 = request.body.option3;
        const option4 = request.body.option4;
        const pollCreator = request.body.pollCreator;
        const created_at = new Date();

        // console.log(request.body)

        newPoll = {
            question,
            option1,
            option2,
            option3,
            option4,
            pollCreator,
            created_at
        }
        console.log("poll: ", newPoll)

        PollModel
            .createPoll( newPoll )
            .then( result =>{
                response.status(200).json({message: "Poll created successfully"})
            })
            .catch( err =>{
                console.log(err);
                response.json(err)
            });
    },

    findPolls: function(request, response){
        PollModel
            .getPolls()
            .then( result =>{
                // console.log(result);
                response.status(200).json(result)
            })
            .catch( err =>{
                // console.log(err)
                Response.json(err)
            })
    },

    findPollById: function(request, response){
        const _id = request.params.id;
        // console.log("param", _id);
        PollModel
            .getPollById( _id )
            .then( result =>{
                response.json(result)
            });
    },

    deleteOnePoll: function(request, response){
        const _id = request.params.id;
        console.log(_id);
        PollModel
            .deletePoll(_id)
            .then( result =>{
                response.json({message: "deleted"})
            })
    },

    incrementVoteCount: function(request, response){
        const _id = request.body._id
        const option = request.body.option
        console.log("new request:", request.body._id);
        console.log("option: ", request.body.option);
        let updatedVote = {}
        PollModel
            .getPollById(_id)
            .then( poll =>{
                if( option == 1){
                    currentVoteCount = poll.votesOption1;
                    newCount = currentVoteCount + 1;
                    updatedVote.votesOption1 = newCount;
                    console.log(updatedVote)
                }
                else if( option == 2 ){
                    currentVoteCount = poll.votesOption2;
                    newCount = currentVoteCount + 1;
                    updatedVote.votesOption2 = newCount;
                    console.log(updatedVote)
                }
                else if( option == 3 ){
                    currentVoteCount = poll.votesOption3;
                    newCount = currentVoteCount + 1;
                    updatedVote.votesOption3 = newCount;
                    console.log(updatedVote)
                }
                else if( option == 4 ){
                    currentVoteCount = poll.votesOption4;
                    newCount = currentVoteCount + 1;
                    updatedVote.votesOption4 = newCount;
                    console.log(updatedVote)
                }
                PollModel
                    .updateCount(_id, updatedVote )
                    .then(result =>{
                        response.json({message: "sucessfully updated"})
                    } )
            });

        console.log("controller despues de info",updatedVote);

    }


}

module.exports = { PollController };