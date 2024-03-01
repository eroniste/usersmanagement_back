import express from 'express';

import { addUsers,getUserList, deleteUser, updateUser, getUser } from '../controllers/users';

export default (router: express.Router) => {
  
  router.get('/users', getUserList);
  router.get('/users/:userId', getUser)
  router.post('/users', addUsers);
  router.delete('/users/:userId', deleteUser);
  router.put('/users/:userId', updateUser);
  
  
  
  
};