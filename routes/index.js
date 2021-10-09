const express = require('express');

const router=express.Router();
const homeController=require('../controllers/homeController');



router.get('/',homeController.home);
router.get('/login',homeController.login);
router.get('/featured',homeController.featured);
router.get('/schools_colleges',homeController.edu);
router.get('/investors',homeController.investors);
router.get('/learn',homeController.learn)
router.get('/startups',homeController.startups);
router.use('/signup',require('./signUp'));
router.use('/investor',require('./investor'));
/* 
for any further requests, access from here
router.use('/routerName , require('./routerFile))
*/


module.exports=router;