import { Entity, Column, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, BeforeInsert, OneToMany, CreateDateColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import Quiz from './quiz.entity';
import Content from './content.entity';
import Student from './student.entity';
import Teacher from './teacher.entity';
import Classroom from './classroom.entity';


@Entity('classroom-students')
export class ClassroomStudents {
    @PrimaryGeneratedColumn('increment')
    id: number;


    @ManyToOne(() => Student, (student) => student.studentsQuizs)
    public student: Student
/*
    @ManyToOne(() => Classroom, (classroom) => classroom.studentsClassroom)
    public classroom: Classroom
*/

}

export default ClassroomStudents;