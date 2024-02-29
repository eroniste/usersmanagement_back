import express from 'express';

import users from './users';
import Admin from './Admin';

const router = express.Router();

export default (): express.Router => {
  users(router);
  Admin(router)
  return router;
};