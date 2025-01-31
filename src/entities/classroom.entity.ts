import { Entity, Column, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, BeforeInsert, OneToMany, CreateDateColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import Quiz from './quiz.entity';
import Content from './content.entity';
import Student from './student.entity';
import Teacher from './teacher.entity';
import ClassroomStudents from './classroom-students.entity';


@Entity('classroom')
export class Classroom {
    @PrimaryGeneratedColumn('increment')
    id: number;


    @Column('varchar', { length: 100, nullable: false })
    name: string;


    @ManyToOne(() => Teacher, (teacher) => teacher.classrooms)
    teacher: Teacher
    
    @OneToMany(() => Student, classroomStudents => classroomStudents.classroom)
    public students: Student[];
}

export default Classroom;