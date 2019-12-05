import express from 'express';
const router = express.Router();
import axios from 'axios';
import { IUser } from '../oauthtypes';

router.get('/:id/repos', (req, res) => {
  let ghUser = req.user as IUser
  let config = {
    headers: {
      Authorization: `Bearer ${ghUser.accessToken}`,
      'User-Agent': 'react-oauth-btb'
    }
  }
  axios.get('https://api.github.com/user/repos', config)
  .then(resp => {
    res.json(resp.data)
  }).catch(err => console.log(err));
});

export default router;