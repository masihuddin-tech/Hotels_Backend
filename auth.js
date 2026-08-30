const passport = require('passport');   //Passport is used for authentication purpose
const LocalStrategy = require('passport-local').Strategy;   //We are using passport local strategy, in which we only authenticate using username and password (There are many strategy as well like, google authentication, social media authentication, etc).
const Person = require('./models/Person');

// //Authentication Logic.
passport.use(new LocalStrategy(async (USERNAME, password, done) =>{
  try{
    const user = await Person.findOne({username: USERNAME});
    if(!user){
      return done(null, false, {message: "Incorrect Username."});
    }

    const isPasswordMatch = await user.comparePassword(password);
    if(isPasswordMatch){
      return done(null, user);
    }
    else{
      return done(null, false, {message: "Incorrect password."});
    }

  }catch(err){
    return done(err);
  }
}))

module.exports = passport;