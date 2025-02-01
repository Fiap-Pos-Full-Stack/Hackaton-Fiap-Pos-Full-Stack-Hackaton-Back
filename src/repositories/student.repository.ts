import Student from "../entities/student.entity";
import IStudent from "../interfaces/IStudent";
import { AppDataSource } from "../data-source";

export const STUDENT_PER_PAGE = 5
export class StudentRepository {
    private repository = AppDataSource.getRepository(Student);
    findUsernameByNameAndPassword = (username: string, password:string): Promise<IStudent | null> => {
       return this.repository.findOne({ where: { username:username, password:password } });
    }
    getStudents = (page:number): (Promise<[IStudent[],number]>) => {
        if(!page){
            page =1
        }
        return this.repository.findAndCount({
            take: STUDENT_PER_PAGE,
            skip: (page-1) * STUDENT_PER_PAGE,
            order:{ id:'DESC'},
            select: { username:true, id:true,name:true},
        })
    }
    getStudentById = (id: number): Promise<IStudent| null> => {

       return this.repository.createQueryBuilder("student")
       .leftJoinAndSelect('student.classroom', 'classroom')
       .leftJoinAndSelect('classroom.teacher', 'teacher')
       .leftJoinAndSelect('teacher.contents', 'content')
       .leftJoinAndSelect('student.studentsQuizs', 'student-do-quiz')
       .leftJoinAndSelect('student-do-quiz.quiz', 'quiz')
       .leftJoinAndSelect('quiz.slide', 'slide')
       .leftJoinAndSelect('slide.content', 'content as contextaux')
        .where('student.id = :id', { id: id })
        .getOne()
        return this.repository.findOne({
            where: { id },
            relations: ["studentsClassroom"]
        });
    };

    createStudent= async (username: string, password:string, name :string,ra:string): Promise<IStudent> => {
        const newPost = this.repository.create({
            username,
            password,
            name,
            ra
        });
        return await this.repository.save(newPost);
     }

     updateStudent= async (id: number, userId :number,updatedData: Partial<IStudent>): Promise<IStudent| null> => {
        await this.repository.update(id, updatedData);
        const updatedStudent = await this.repository.findOne({ where: { id } });
        if (updatedStudent != null) {
            this.repository.merge(updatedStudent, updatedData);
            const res = this.repository.save(updatedStudent);
            return res;
        }
        return null
    };

    deleteStudent= async (id: number): Promise<boolean> => {
        const deleteResult = await this.repository.delete(id);
        return deleteResult.affected !== 0;
    };
  }


export default { StudentRepository };