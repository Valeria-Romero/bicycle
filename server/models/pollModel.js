const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
    question:{
        type: String,
        required: true,
    },
    option1:{
        type: String,
        required: true,
    },
    option2:{
        type: String,
        required: true,
    },
    option3:{
        type: String,
        required: true,
    },
    option4:{
        type: String,
        required: true,
    },
    votesOption1:{
        type: Number,
        default: 0
    },
    votesOption2:{
        type: Number,
        default: 0
    },
    votesOption3:{
        type: Number,
        default: 0
    },
    votesOption4:{
        type: Number,
        default: 0
    },
    pollCreator: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
});

const Poll = mongoose.model( 'polls', PollSchema);

const PollModel = {
    createPoll: function( newPoll ){
        return Poll.create( newPoll )
    },

    getPolls: function(){
        return Poll.find();
    }, 

    getPollById : function( _id ){
        return Poll.findOne( {_id} );
    },

    deletePoll: function( pollId ){
        return Poll.remove({_id: pollId});
    },

    updateCount: function( _id, updatedVote ){
        console.log("info model:", updatedVote);
        return Poll.findOneAndUpdate({_id}, {$set: updatedVote}, {new:true})
    }
}

module.exports= {PollModel}