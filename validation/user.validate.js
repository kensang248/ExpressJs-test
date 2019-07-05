module.exports.postCreate =function (request,response,next) {
    let errors=[];
    if(!request.body.name){
        errors.push('Name is required.');
    }
    if(!request.body.phone){
        errors.push('Phone is required.');
    }
    if(errors.length){
        response.render('user/create',{
            errors:errors,
            values:request.body
        });
        return;
    }
    next();
} ;
