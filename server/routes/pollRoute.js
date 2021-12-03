const express = require('express')
const PollRouter = express.Router();
const { PollController } = require( './../controllers/pollController')

PollRouter
    .route('/newpoll')
    .post( PollController.createNewPoll )

PollRouter
    .route('/allpolls')
    .get( PollController.findPolls )

PollRouter
    .route('/pollById/:id')
    .get( PollController.findPollById)

PollRouter
    .route('/removePoll/:id')
    .delete( PollController.deleteOnePoll)

PollRouter
    .route('/updateCount')
    .put( PollController.incrementVoteCount )


module.exports = { PollRouter }