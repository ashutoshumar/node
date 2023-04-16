var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config.js');
var User = require('./models/user');
var Dishes = require('./models/dishes');

 passport.use(new LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());


exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});



// exports.verifyComments = (userId,dishId,commentId) =>{
   
//     Dishes.findById(dishId)
//     .populate('comments.author')  
//     .then((dish) => {
//         if (dish != null && dish.comments.id(commentId) != null) {
//              if( dish.comments.id(commentId).author._id===userId)
//              {
//                  return done(null,dish);
//              }
//              else{
//                 err = new Error('You are allowerd to alter the comment');
//                 err.status = 404;
//                 return done(err=>{next(err)}, false); 
//              }
//         }
//         else if (dish == null) {
//             err = new Error('Dish ' + req.params.dishId + ' not found');
//             err.status = 404;
//             return done(err=>{next(err)}, false);
//         }
//         else {
//             err = new Error('Comment ' + req.params.commentId + ' not found');
//             err.status = 404;
//             return done(err=>{next(err)}, false);           
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));
// };

