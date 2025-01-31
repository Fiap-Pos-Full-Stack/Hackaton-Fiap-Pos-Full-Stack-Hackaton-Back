import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv';
import Teacher from "./entities/teacher.entity";
import Student from "./entities/student.entity";
import Comment from "./entities/comment.entity";
import Slide from "./entities/slide.entity";
import Quiz from "./entities/quiz.entity";
import { Content } from "./entities/content.entity";
import StudentDoQuiz from "./entities/student-do-quiz.entity";
import Classroom from "./entities/classroom.entity";
import ClassroomStudents from "./entities/classroom-students.entity";
dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [Student, Teacher, Comment, Content, Slide, Quiz,StudentDoQuiz, Classroom,ClassroomStudents], // where our entities reside
    migrations: ["src/migrations/*{.ts,.js}"], // where our migrations reside
    subscribers: [],
})
