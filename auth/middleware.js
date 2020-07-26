function ensureLoggedIn(req, res,next) {
    console.log(req.signedCookies)
    if(req.signedCookies.user_id) {
        next();
    }else {
        res.status(401)
        next(new Error('UnAuthorized'))
    }
}

function allowAccess(req, res, next) {
    if(req.signedCookies.user_id = req.params.id) {
        next();
    }else {
        res.status(401)
        next(new Error('UnAuthorized'))
    }
}

module.exports= {
    ensureLoggedIn,
    allowAccess

}