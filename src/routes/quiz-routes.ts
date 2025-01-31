import { Router, Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { TeacherController } from '../controllers/teacher.controller';
import {TeacherRepository } from '../repositories/teacher.repository';
import { teacherMiddleware,paramMiddleware } from '../middleware/auth';
import { roles } from '../enums/roles';
import { QuizController } from '../controllers/quiz.controller';
import { StudentDoQuizRepository } from '../repositories/student-do-quiz.entity.repository';

const teacherRouter = Router();


teacherRouter.put('/:id', paramMiddleware([roles.STUDENT]),new QuizController(new StudentDoQuizRepository()).responseQuiz);
teacherRouter.post('/generate', paramMiddleware([roles.TEACHER]),new QuizController(new StudentDoQuizRepository()).generateQuiz);


export default teacherRouter;