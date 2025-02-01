import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routers from './routes/login-routes';
import contentRouter from './routes/content-routes';
import teacherRouter from './routes/teacher-routes';
import loginRouter from './routes/login-routes';
import studentRouter from './routes/student-routes';
import quizRouter from './routes/quiz-routes';
import classroomRouter from './routes/classroom-routes';
import init from './routes/init-routes';
const app = express();

app.use(cors());

app.use(express.json());

app.use('/contents',contentRouter);
app.use('/teacher',teacherRouter);
app.use('/student',studentRouter);
app.use('/login',loginRouter);
app.use('/quiz',quizRouter);
app.use('/classroom',classroomRouter);
app.use('/init',init);
export default app;