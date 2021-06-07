require('dotenv-safe').config();
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import { hashPassword, comparePassword } from '../utils/hashPassword';

export default {
  async store(req: Request, resp: Response) {
    const { email, password } = req.body;
    const dbUser = await prisma.users.findUnique({
      where: { email }
    })
    if (dbUser) {
      return resp.status(400).json({error: "Usuário já cadastrado"})
    }

    const hashedPassword = await hashPassword(password);

    await prisma.users.create({
      data: { email, password: hashedPassword}
    })

    return resp.json({message: "Usuário cadastrado com sucesso"});
  },

  async auth(req: Request, resp: Response) {
    const { email, password } = req.body;

    const userDb = await prisma.users.findUnique({
      where: { email }
    })

    if (!userDb) {
      return resp.status(500).json({error: "E-mail incorreto"})
    }

    const match = comparePassword(password, userDb.password);

    if(!match) {
      return resp.status(500).json({error: "Senha incorreta"})
    }

    const token = jwt.sign({ id: userDb.id }, String(process.env.SECRET), {
      expiresIn: 84600
    })

    return resp.json({auth: true, token});
  }
}