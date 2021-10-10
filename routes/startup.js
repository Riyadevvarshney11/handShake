const express = require('express');
const passport = require('passport');
const router=express.Router();
const startupsController=require('../controllers/startupController');



router.post('/create',startupsController.create);
router.get('/sign-out',startupsController.destroySession);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'startup-local', //strategy to use
    {failureRedirect: '/learn'}
) ,startupsController.createSession);



module.exports=router;