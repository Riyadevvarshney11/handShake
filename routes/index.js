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
router.get('/startup_db',homeController.startup_db)
router.get('/investor_db',homeController.investor_db);
router.get('/razorpay',homeController.razorpay);
router.get('/comingsoon',homeController.comingsoon);
router.use('/signup',require('./signUp'));
router.use('/investor',require('./investor'));
router.use('/startup',require('./startup'));



/* 
for any further requests, access from here
router.use('/routerName , require('./routerFile))
*/


module.exports=router;