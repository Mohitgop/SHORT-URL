const { getUser } = require('../service/auth');

function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if (!tokenCookie) return next();

    const token = tokenCookie; 
    const user = getUser(token);

    req.user = user;
    return next();
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login');
        if (!roles.includes(req.user.role)) 
            return res.end("UnAuthorized");
        return next();
    };
}


// async function restrictToLoggedinUserOnly(req, res, next) {
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers["authorization"];
//     console.log(req.headers);
//     if (!userUid) return res.redirect("/login");
//     const token = userUid.split("Bearer ")[1]; // Assuming Bearer token format
//     const user = getUser(token);

//     if (!user) return res.redirect("/login");
//     req.user = user;
//     next();
// }  

// async function checkAuth( req, res, next) {
//     console.log(req.headers);
//     const userUid = req.headers["authorization"];
//     const token = userUid.split("Bearer ")[1]; // Assuming Bearer token format

//     // const userUid = req.cookies?.uid;
//     // const user = getUser(userUid);
//     const user = getUser(token);

//     req.user = user;
//     next();
// }

module.exports = {
    checkForAuthentication, 
    restrictTo,
}