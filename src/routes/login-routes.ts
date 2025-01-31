import { Router, Request, Response } from 'express';
import {TeacherRepository } from '../repositories/teacher.repository';
import { LoginController } from '../controllers/login.controller';
import { StudentRepository } from '../repositories/student.repository';

const loginRouter = Router();

loginRouter.post('/', new LoginController(new TeacherRepository(), new StudentRepository()).login);

export default loginRouter;