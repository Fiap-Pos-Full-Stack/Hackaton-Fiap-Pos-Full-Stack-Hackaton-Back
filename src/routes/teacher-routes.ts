import { Router, Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { TeacherController } from '../controllers/teacher.controller';
import {TeacherRepository } from '../repositories/teacher.repository';
import { teacherMiddleware,paramMiddleware } from '../middleware/auth';
import { roles } from '../enums/roles';

const teacherRouter = Router();

teacherRouter.get('/', paramMiddleware([roles.TEACHER]),new TeacherController(new TeacherRepository()).readAll);
teacherRouter.get('/:id',paramMiddleware([roles.TEACHER]),new TeacherController(new TeacherRepository()).readId);

teacherRouter.put('/:id', paramMiddleware([roles.TEACHER]),new TeacherController(new TeacherRepository()).update);

teacherRouter.delete('/:id', paramMiddleware([roles.TEACHER]),new TeacherController(new TeacherRepository()).delete);

teacherRouter.post('/',new TeacherController(new TeacherRepository()).create);

export default teacherRouter;