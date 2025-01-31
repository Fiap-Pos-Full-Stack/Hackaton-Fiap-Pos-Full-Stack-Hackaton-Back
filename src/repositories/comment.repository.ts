import Comment from "../entities/comment.entity";
import IComment from "../interfaces/IComment";
import { AppDataSource } from "../data-source";

export class CommentRepository {
    private repository = AppDataSource.getRepository(Comment);

    insertNewComment = async (postId :number, name:string, comentary: string): Promise<IComment> => {

        const newComment = this.repository.create({
            post:{id:postId},
            name,
            created:new Date(),
            comentary,
             });
        return await this.repository.save(newComment);
     }
  }

export default { CommentRepository };