import { Router, Request, Response } from 'express';
import { AppDataSource } from "../data-source";

import { teacherMiddleware,paramMiddleware } from '../middleware/auth';
import { CommentRepository } from '../repositories/comment.repository';
import { roles } from '../enums/roles';
import { ContentController } from '../controllers/content.controller';
import { ContentRepository } from '../repositories/content.repository';

const postRouter = Router();

postRouter.get('/', new ContentController( new ContentRepository()).readAll);
postRouter.get('/teacher',paramMiddleware([roles.TEACHER]), new ContentController( new ContentRepository()).readAllByTeacher);
//postRouter.get('/admin', paramMiddleware([roles.TEACHER]),new PostController(new PostRepository(), new CommentRepository()).readTeacherPosts);

//postRouter.get('/search', new PostController(new PostRepository(), new CommentRepository()).searchPosts)

postRouter.get('/:id', new ContentController(new ContentRepository()).readId);

postRouter.post('/', paramMiddleware([roles.TEACHER]),new ContentController( new ContentRepository()).create);

//postRouter.put('/:id', paramMiddleware([roles.TEACHER]),new PostController(new PostRepository(), new CommentRepository()).update);

//postRouter.delete('/:id', paramMiddleware([roles.TEACHER]),new PostController(new PostRepository(), new CommentRepository()).delete);

//postRouter.post('/comment/:id',new PostController(new PostRepository(), new CommentRepository()).addPostComment);

export default postRouter;


