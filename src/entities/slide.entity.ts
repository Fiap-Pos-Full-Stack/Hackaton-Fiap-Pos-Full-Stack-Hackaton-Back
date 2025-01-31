import { Entity, Column, ObjectId, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Quiz from './quiz.entity';
import Content from './content.entity';


@Entity('slide')
export class Slide {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 100, nullable: true })
    text: string;

    @Column('varchar', { length: 100, nullable: true })
    image: string;

    @OneToOne(() => Quiz, (quiz) => quiz.slide,{   cascade: true,
        eager: true,})
    @JoinColumn()
    quiz: Quiz

    @ManyToOne(() => Content, (post) => post.slides)
    content: Content

}

export default Slide;