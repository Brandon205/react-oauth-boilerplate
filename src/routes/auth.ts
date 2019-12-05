import express from 'express';
const router = express.Router();
import passport from '../config/ppConfig';
import {IUser} from '../oauthtypes';

router.get('/github', passport.authenticate('github'))

router.get('/github/callback', passport.authenticate('github', {failureRedirect: '/auth/github'}), (req, res) => {
  // Successful auth
  console.log(`This is the user from the db: ${req.user}`)
  res.render('success', {user: req.user as IUser})
})

export default router
