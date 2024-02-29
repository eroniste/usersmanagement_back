import express from 'express';

import { addUsers,getUserList, deleteUser, updateUser } from '../controllers/users';

export default (router: express.Router) => {
  
  router.get('/users', getUserList);
  router.post('/users', addUsers);
  router.delete('/users/:userId', deleteUser);
  router.put('/users/:userId', updateUser);
  
  
  
  
};