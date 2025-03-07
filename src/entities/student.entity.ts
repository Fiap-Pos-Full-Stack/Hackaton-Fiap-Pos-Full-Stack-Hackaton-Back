import { Entity, Column, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, BeforeInsert, OneToMany, CreateDateColumn, ManyToOne } from 'typeorm';
import StudentDoQuiz from './student-do-quiz.entity';
import ClassroomStudents from './classroom-students.entity';
import Classroom from './classroom.entity';
import Parent from './parent.entity';


@Entity('student')
export class Student {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column('varchar', { length: 100, nullable: false })
    username: string;
    
    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @Column('varchar', { length: 2000, nullable: false })
    password: string;

    @Column('varchar', { length: 200, nullable: true })
    ra: string;


    @OneToMany(() => StudentDoQuiz, questionToCategory => questionToCategory.student)
    public studentsQuizs: StudentDoQuiz[];

    @ManyToOne(() => Classroom, classroomStudents => classroomStudents.students)
    public classroom: Classroom;

    @ManyToOne(() => Parent, classroomStudents => classroomStudents.childrens)
    public parent: Parent;


}

export default Student;