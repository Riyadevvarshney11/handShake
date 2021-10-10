const Startup = require('../models/startup');

module.exports.create = function(req,res){
    Startup.findOne({email: req.body.email},function(err, startup){
        if(err){console.log('Error in finding startup in database'); return;}
        if(!startup){
            Startup.create(req.body, function(err,startupCreated){
                if(err){console.log('Error in creating investor'); return;}
                console.log('Investor Created:',startupCreated);
                return res.redirect('/');
            });
        }else{
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(request,response){
    console.log("startup Signed In");
    return response.redirect('/');
}

// ======= sign out ==============
module.exports.destroySession = function(request,response){
    //given to request by passport
    request.logout();
    return response.redirect('/');
}