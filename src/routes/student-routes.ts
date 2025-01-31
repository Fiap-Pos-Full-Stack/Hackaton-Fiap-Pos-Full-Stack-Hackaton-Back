import { Router, Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { StudentController } from '../controllers/student.controller';
import {StudentRepository } from '../repositories/student.repository';
import { teacherMiddleware,paramMiddleware } from '../middleware/auth';
import { roles } from '../enums/roles';

const studentRouter = Router();

studentRouter.get('/',  paramMiddleware([roles.TEACHER]),new StudentController(new StudentRepository()).readAll);
studentRouter.get('/quiz',  paramMiddleware([roles.STUDENT]),new StudentController(new StudentRepository()).getQuizInfo);
studentRouter.get('/:id', paramMiddleware([roles.TEACHER]),new StudentController(new StudentRepository()).readId);

studentRouter.put('/:id',  paramMiddleware([roles.TEACHER]),new StudentController(new StudentRepository()).update);

studentRouter.delete('/:id',  paramMiddleware([roles.TEACHER]),new StudentController(new StudentRepository()).delete);

studentRouter.post('/',new StudentController(new StudentRepository()).create);
studentRouter.post('/login', new StudentController(new StudentRepository()).login);


export default studentRouter;