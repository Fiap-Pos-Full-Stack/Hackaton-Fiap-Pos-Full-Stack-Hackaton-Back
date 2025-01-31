import { Entity, Column, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, BeforeInsert, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import Teacher from './teacher.entity';
import Comment from './comment.entity';
import Slide from './slide.entity';


@Entity('content')
export class Content {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @CreateDateColumn()
    created: Date; // Creation date
    
    @ManyToOne(() => Teacher, (teacher) => teacher.contents)
    teacher: Teacher

    @OneToMany(() => Slide, (slide) => slide.content,{   cascade: true,
        eager: true,})
    slides: Slide[]

}

export default Content;