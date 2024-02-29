import express from 'express';

import { addUsers,getUserList } from '../controllers/users';
import{ currentUser, signin, signup } from '../controllers/Authentification'

export default (router: express.Router) => {
  
  router.post('/signin', signin);
  router.post('/signup', signup);
  router.get('/currentUser', currentUser);

  
  
  
  
  
};