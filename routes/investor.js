const express = require('express');
const passport = require('passport');
const router=express.Router();
const investorsController=require('../controllers/investorsController');



router.post('/create',investorsController.create);
router.get('/sign-out',investorsController.destroySession);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local', //strategy to use
    {failureRedirect: '/learn'}
) ,investorsController.createSession);



module.exports=router;