import { Entity, Column, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, BeforeInsert, OneToMany, ManyToOne, CreateDateColumn, OneToOne } from 'typeorm';
import StudentDoQuiz from './student-do-quiz.entity';
import Slide from './slide.entity';


@Entity('quiz')
export class Quiz {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 200, nullable: true })
    question: string;
    @Column('varchar', { length: 5000, nullable: true })
    reason: string;

    @Column('varchar', { length: 100, nullable: false })
    option1: string;


    @Column('varchar', { length: 100, nullable: false })
    option2: string;


    @Column('varchar', { length: 100, nullable: false })
    option3: string;

    @Column('varchar', { length: 100, nullable: false })
    option4: string;

    @Column('int', {nullable: false })
    rightOption: number;

    @OneToMany(() => StudentDoQuiz, questionToCategory => questionToCategory.quiz)
    public studentsQuizs: StudentDoQuiz[];

    @OneToOne(() => Slide,(slide) => slide.quiz)
    slide: Slide

}

export default Quiz;