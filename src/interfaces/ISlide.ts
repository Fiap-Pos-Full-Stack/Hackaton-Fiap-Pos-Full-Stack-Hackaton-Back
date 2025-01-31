import IQuiz from "./IQuiz";


interface ISlide {
    id?: number;
    text?: string;
    image?: string;
    quiz?: IQuiz
}

export default ISlide;