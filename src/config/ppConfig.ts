import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import passportGithub2 from 'passport-github2';
const GithubStrategy = passportGithub2.Strategy;
import User from '../models/user';
import { PPCB, IUser } from '../oauthtypes';

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
}, function(accessToken: string, refreshToken: string, profile: passportGithub2.Profile, cb: PPCB) {
  User.findOne({githubId: profile.id}, function(err, user) {
    if (!user) { // Add the new User to db because they are new
      User.create({
        githubId: profile.id
      }, function(err: any, user: any) {
        return cb(null, {...user.toObject(), accessToken} as IUser)
      })
    } else {
      return cb(null, {...user.toObject(), accessToken} as IUser)
    }
  })
}))

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

export default passport;
