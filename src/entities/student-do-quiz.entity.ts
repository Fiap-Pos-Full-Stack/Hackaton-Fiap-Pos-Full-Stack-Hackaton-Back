import { Entity, Column, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, BeforeInsert, OneToMany, CreateDateColumn, ManyToOne } from 'typeorm';
import Student from './student.entity';
import Quiz from './quiz.entity';


@Entity('student-do-quiz')
export class StudentDoQuiz {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column('int', { nullable: false })
    markedOption: number;
    
  
    @ManyToOne(() => Student, (student) => student.studentsQuizs)
    public student: Student

    @ManyToOne(() => Quiz, (quiz) => quiz.studentsQuizs)
    public quiz: Quiz


}

export default StudentDoQuiz;