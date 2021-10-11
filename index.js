const express = require('express');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const dotenv = require("dotenv")
const port = 3000;
const app=express();
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport-strategy-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');




const  razorpay= new Razorpay({
    key_id:'rzp_test_7O3kqfoR6kS89b',
    key_secret:'RmkBpMapZeVE0pP0xon4cve4' ,

})
dotenv.config();

let order_id_variable
// form data parsing
app.use(express.urlencoded({extended:false}));


//================ Static Files ==================
app.use(express.static('./assets'));
app.use(cookieParser());

//======== View Engine ======================
app.set('view engine','ejs');
app.set('views','./views');

//======== Session Creation ==================
//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'handshake',
    //TODO change the secret before deployment in production mode
    secret: 'innovathon',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) //ms
    },
    store: MongoStore.create(
        {
            mongoUrl: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learning.rosxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

//======== Using Passport =======================
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//=========== razorpay code ===================
app.get('/razorpay',(req,res)=>{
    res.render('razorpay.ejs')
})
app.post('/order',(req,res) => {
    let options ={
        amount: 10000000000,
        currency: "INR",
        
    };
    razorpay.orders.create(options, function(err,order){
        order_id_variable=order.id
        console.log(order)
        res.json(order)
    })
})

app.post('/is-order-complete',(req,res)=>{
  
    razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument) => {
        if(paymentDocument.status = 'captured'){
            res.send('Payment Successful')

        } else{
            res.redirect('/razorpay')
        }
    })
})
//========  express router ===============
app.use('/',require('./routes'));

//========   particlejs   ================
// particlesJS.load('particles-js', 'assets/particles.json', function() {
//     console.log('callback - particles.js config loaded');
//   });


app.listen(port,function(err){
    if(err){
        console.log(`Error encountered in running the server: ${err}`);
        //interpolation string
        return;
    }
    console.log(`Server is running on port: ${port}`);
});


