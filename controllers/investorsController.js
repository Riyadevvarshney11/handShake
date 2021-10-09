const Investor = require('../models/investor');

module.exports.create = function(req,res){
    Investor.findOne({email: req.body.email},function(err, investor){
        if(err){console.log('Error in finding investor in database'); return;}
        if(!investor){
            Investor.create(req.body, function(err,investorCreated){
                if(err){console.log('Error in creating investor'); return;}
                console.log('Investor Created:',investorCreated);
                return res.redirect('/');
            });
        }else{
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(request,response){
    console.log("Signed In");
    return response.redirect('/');
}

// ======= sign out ==============
module.exports.destroySession = function(request,response){
    //given to request by passport
    request.logout();
    return response.redirect('/');
}