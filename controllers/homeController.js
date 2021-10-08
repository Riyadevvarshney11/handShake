
module.exports.home = function(req,res){
    return res.render('index');
}

module.exports.login = function(req,res){
    return res.render('signin');
}

module.exports.startups = function(req,res){
    return res.render('startups');
}

module.exports.investors = function(req,res){
    return res.render('investors');
}

module.exports.learn = function(req,res){
    return res.render('learn');
}

module.exports.edu = function(req,res){
    return res.render('school_colleges');
}

module.exports.featured = function(req,res){
    return res.render('featured');
}