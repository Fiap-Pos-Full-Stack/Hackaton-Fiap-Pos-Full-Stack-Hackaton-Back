import { Entity, Column, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, BeforeInsert, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';


@Entity('comment')
export class Comment {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @Column('varchar', { length: 5000, nullable: false })
    comentary: string;

    @CreateDateColumn({ name: 'created' })
    created: Date; // Creation date

    /*
    @ManyToOne(() => Post, (post) => post.comments)
    post: Post*/

}

export default Comment;