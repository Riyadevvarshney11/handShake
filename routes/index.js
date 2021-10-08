const express = require('express');

const router=express.Router();
const homeController=require('../controllers/homeController');



router.get('/',homeController.home);
router.get('/login',homeController.login)
router.use('/signup',require('./signUp'));
/* 
for any further requests, access from here
router.use('/routerName , require('./routerFile))
*/


module.exports=router;