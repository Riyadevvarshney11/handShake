const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const Investor = require('../models/investor');
const Startup = require('../models/startup');


//Authentication using passport
passport.use('local',new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done){
        //find a user and establish the identity
        Investor.findOne({email: email},function(err,user){
            if(err){
                console.log("Error in finding investor ---> Passport");
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid username/password');
                return done(null,false);
                //arguement1 is err arguement2 is authicated or not
            }
            //user found
            return done(null,user);
            
        });
        
    }
));

passport.use('startup-local',new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done){
        //find a user and establish the identity
        console.log('local-startup called');
        Startup.findOne({email: email},function(err,user){
            if(err){
                console.log("Error in finding startup ---> Passport");
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid username/password');
                return done(null,false);
                //arguement1 is err arguement2 is authicated or not
            }
            //user found
            user.startup = true
            console.log('user found');
            return done(null,user);
            
        });
        
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    console.log('serializer called');
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    Investor.exists({_id: id},function(err,result){
        if(err){
            console.log(err);
        }
        console.log(result);

        if(result != null){
            Investor.findById(id,function(err,user){
                if(err){
                    console.log("Error in finding user ---> Passport");
                    return done(err);
                }
                console.log('investor deserializer called',user);
                return done(null,user);
            });
        }else{
            Startup.findById(id,function(err,user){
                if(err){
                    console.log("Error in finding user ---> Passport");
                    return done(err);
                }
                console.log('startup deserializer called',user);
                return done(null,user);
            });
        }
    });
});

//created a function to check if the user is authenticated (used as middleware)
passport.checkAuthentication = function(request,response,next){
    // if the user is signed in, then pass on the request to the next function (controller's action)
    // console.log('check authentucation called');
    if(request.isAuthenticated()){
        return next();
    }else{
        //user not signed in
        return response.redirect('/login');
    }
}

passport.setAuthenticatedUser = function(request,response ,next){
    console.log('set authentucation called');
    if(request.isAuthenticated()){
        // req.user contains the current signed in user from the session cokkie and we are just sending this to the locals for the views
        response.locals.user = request.user;
        console.log(request.user);
    }else{
        console.log('not authenticated');
    }
    next();
}

module.exports = passport;