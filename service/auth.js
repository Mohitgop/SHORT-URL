const jwt = require('jsonwebtoken');  //stateless
const secret = "Mohit@123";

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
    },
    secret
);
}

function getUser(token){
    if (!token) return null;
    try {
    return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
};

// const sessionIdToUserMap = new Map();// statefull
// function setUser(id, user){
//     sessionIdToUserMap.set(id, user);
// }
// // function getUser(id){
//     return sessionIdToUserMap.get(id);
// }