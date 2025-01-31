import IPost from "./IPost";

interface IComment {
    id: number;
    name: string,
    comentary: string;
    created: Date;
    post: IPost;
}

export default IComment;