import IClassroom from "./IClassroom";
import IStudentDoQuiz from "./IStudentDoQuiz";

interface IStudent {
    studentsQuizs: IStudentDoQuiz[]
    id: number;
    username?: string;
    password?: string;
    name?: string;
    clasrooms? : IClassroom[]
}

export default IStudent;