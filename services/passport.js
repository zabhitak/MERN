const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('usersabhi');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => console.log(err));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log('access token',accessToken);
      // console.log('refresh token',refreshToken);
      // console.log('profile',profile);
      const existingUser = await User.findOne({googleId: profile.id});

      if (existingUser) {
        //we already have a record with the given profile id
        return done(null, existingUser);
      } 
        //no id account
        const user = await new User({googleId: profile.id}).save()
        done(null,user); 
    }
  )
);
