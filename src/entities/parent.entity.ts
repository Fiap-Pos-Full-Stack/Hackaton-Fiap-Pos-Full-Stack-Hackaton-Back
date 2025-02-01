import { Entity, Column, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, BeforeInsert, OneToMany, CreateDateColumn, ManyToOne } from 'typeorm';
import StudentDoQuiz from './student-do-quiz.entity';
import ClassroomStudents from './classroom-students.entity';
import Classroom from './classroom.entity';
import Student from './student.entity';


@Entity('parent')
export class Parent {
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


    @OneToMany(() => Student, c => c.parent)
    public childrens: Student[];


}

export default Parent;