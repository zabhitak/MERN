const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('usersabhi');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id)
    .then(user => {
        done(null, user)
    }).catch(err => console.log(err));
});  

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log('access token',accessToken);
      // console.log('refresh token',refreshToken);
      // console.log('profile',profile);
      User.findOne({googleId: profile.id})
      .then((existingUser) => {
        if (existingUser) {
          //we already have a record with the given profile id
          done(null, existingUser);
        } else {
          //no id account
          new User({googleId: profile.id})
            .save()
            .then((user) => done(null, user))
        }
      }); //search if this user is present or not
    }
  )
);
