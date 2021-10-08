const express = require('express');

const router=express.Router();
const signupController=require('../controllers/signupController');



router.get('/startup',signupController.startup);
router.get('/investor',signupController.investor);


module.exports=router;