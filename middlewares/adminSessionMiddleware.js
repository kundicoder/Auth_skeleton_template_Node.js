
module.exports = { 

    isAuth: function(request, response, next){
        
        if (request.session.isAdmin) {
            return next(); // User is authenticated, continue to next middleware
        } else {
            response.redirect('back'); // User is not authenticated,
        }
    }

};