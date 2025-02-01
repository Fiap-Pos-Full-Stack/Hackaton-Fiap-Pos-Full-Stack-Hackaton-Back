import { Router, Request, Response } from 'express';
import { AppDataSource } from "../data-source";

import { teacherMiddleware,paramMiddleware } from '../middleware/auth';
import { CommentRepository } from '../repositories/comment.repository';
import { roles } from '../enums/roles';
import { ContentController } from '../controllers/content.controller';
import { ContentRepository } from '../repositories/content.repository';
import { ClassroomController } from '../controllers/classroom.controller';
import { ClassroomRepository } from '../repositories/classroom.repository';

const router = Router();

router.get('/', new ClassroomController( new ClassroomRepository()).readAll);
router.get('/quiz/ranking/:id', new ClassroomController( new ClassroomRepository()).readRankingById);
router.get('/teacher', paramMiddleware([roles.TEACHER]),new ClassroomController( new ClassroomRepository()).readByTeacher);


//postRouter.get('/admin', paramMiddleware([roles.TEACHER]),new PostController(new PostRepository(), new CommentRepository()).readTeacherPosts);

//postRouter.get('/search', new PostController(new PostRepository(), new CommentRepository()).searchPosts)

//postRouter.get('/:id', new PostController(new PostRepository(), new CommentRepository()).readId);

router.post('/', paramMiddleware([roles.TEACHER]),new ClassroomController( new ClassroomRepository()).create);

//postRouter.put('/:id', paramMiddleware([roles.TEACHER]),new PostController(new PostRepository(), new CommentRepository()).update);

//postRouter.delete('/:id', paramMiddleware([roles.TEACHER]),new PostController(new PostRepository(), new CommentRepository()).delete);

//postRouter.post('/comment/:id',new PostController(new PostRepository(), new CommentRepository()).addPostComment);

export default router;


