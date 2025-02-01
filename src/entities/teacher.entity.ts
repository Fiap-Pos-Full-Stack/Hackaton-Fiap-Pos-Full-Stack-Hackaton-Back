import { Entity, Column, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, BeforeInsert, OneToMany, CreateDateColumn } from 'typeorm';
import Quiz from './quiz.entity';
import Content from './content.entity';
import Classroom from './classroom.entity';


@Entity('teacher')
export class Teacher {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column('varchar', { length: 100, nullable: false })
    username: string;

    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @Column('varchar', { length: 2000, nullable: false })
    password: string;

    @Column('varchar', { length: 200, nullable: true })
    discipline: string;

    @Column('varchar', { length: 200, nullable: true })
    ra: string;

    @OneToMany(() => Content, (content) => content.teacher)
    contents: Content[]

    @OneToMany(() => Classroom, (content) => content.teacher)
    classrooms: Classroom[]

}

export default Teacher;