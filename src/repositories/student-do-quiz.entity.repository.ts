
import StudentDoQuiz from "../entities/student-do-quiz.entity";
import IStudentDoQuiz from "../interfaces/IStudentDoQuiz";
import { AppDataSource } from "../data-source";


export class StudentDoQuizRepository {
    private repository = AppDataSource.getRepository(StudentDoQuiz);

    getStudentDoQuizs= (): (Promise<[IStudentDoQuiz[], number]>) => {
        return this.repository.findAndCount({
            relations: { student: true, quiz:true },
        });
    }
    createContent = async (content: IStudentDoQuiz, quizId:number, studentId: number): Promise<IStudentDoQuiz> => {
        const {
            markedOption,
        } = content
        const newContent = this.repository.create({
            markedOption,
            quiz: { id:quizId },
            student: { id: studentId},
        });
        return await this.repository.save(newContent);
    };

}

export default {
    StudentDoQuizRepository
};