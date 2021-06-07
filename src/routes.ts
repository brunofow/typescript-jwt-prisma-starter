import express from 'express'
import { PrismaClient } from '@prisma/client';
import auth from './config/authConfig';
import UsersControllers from './controllers/UsersController';

const prisma = new PrismaClient();

const routes = express.Router();

routes.get('/', (req, resp) => {
  return resp.json({home: "Hello"})
})

routes.get('/users', auth.authenticate() ,async (req, resp) => {
  const users = await prisma.users.findMany();
  return resp.json(users);
})

routes.post('/users', UsersControllers.store);

routes.post('/auth', UsersControllers.auth);

export default routes;