import IQuiz from "./IQuiz";
import IStudent from "./IStudent";


interface IContent {
    id?: number;
    markedOption: number;
    student?: IStudent
    quiz?: IQuiz

}

export default IContent;