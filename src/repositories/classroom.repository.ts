
import ClassRoom from "../entities/classroom.entity";
import IClassRoom from "../interfaces/IClassroom";
import { AppDataSource } from "../data-source";
import ClassroomStudents from "../entities/classroom-students.entity";
import Student from "../entities/student.entity";


export class ClassroomRepository {
    private repository = AppDataSource.getRepository(ClassRoom);
    private repositoryStudents = AppDataSource.getRepository(Student);
    getClassrooms = (): (Promise<[IClassRoom[], number]>) => {
        return this.repository.findAndCount({
            relations: { teacher: true, },
            select: { teacher: { username: true, id: true } },
        });
    }
    getClassroomsRankingById = ( id:number):  Promise<IClassRoom| null> => {
        return this.repository.createQueryBuilder("classroom")
        .leftJoinAndSelect('classroom.students', 'student')
        .leftJoinAndSelect('student.studentsQuizs', 'student-do-quiz')
        .leftJoinAndSelect('student-do-quiz.quiz', 'quiz')
         .where('classroom.id = :id', { id: id })
         .getOne()
    }
    
    createClassRoom = async (content: IClassRoom): Promise<IClassRoom> => {
        const {
            name,
        } = content
        const newContent = this.repository.create({
            name,
            teacher: { id: content.teacher.id },
            students: content.students
        });
        const classroom = await this.repository.save(newContent);

        try {
            let studentsArray = content.students?.map((student) => {
                const newStudent = this.repositoryStudents.create({
                    classroom: { id: classroom.id },
                })
                this.repositoryStudents.update({ id: student as unknown as number },newStudent)
            })
        }
        catch (error) {
            throw error
        }
        return classroom
    };

}

export default {
    ClassroomRepository
};