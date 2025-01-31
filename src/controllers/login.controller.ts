import { Request, Response } from 'express';
import { TeacherRepository } from '../repositories/teacher.repository';
import * as jwt from 'jsonwebtoken';
import { CustomRequest } from '../middleware/auth';
import { roles } from '../enums/roles';
import { StudentRepository } from '../repositories/student.repository';


export class LoginController {

  private teacherRepository: TeacherRepository;
  private studentRepository: StudentRepository;

  constructor(teacherRepository: TeacherRepository,studentRepository: StudentRepository) {
    this.teacherRepository = teacherRepository;
    this.studentRepository = studentRepository;
  }

  login = async (req: Request, res: Response) => {
    // #swagger.description = 'Autenticar usuario'
    try {
      const { username, password } = req.body
      const [teacher, student] = await Promise.all([
        this.teacherRepository.findUsernameByNameAndPassword(username, password), 
        this.studentRepository.findUsernameByNameAndPassword(username, password)
      ]);
      if (teacher) {
        const token = jwt.sign({ _id: teacher?.id, username: teacher?.username, role:roles.TEACHER }, process.env.JWT_KEY as string, { expiresIn: "1d", });
        return res.json({ "token": token,role:"TEACHER"  });
      }
      if (student) {
        const token = jwt.sign({ _id: student?.id, username: student?.username, role:roles.STUDENT }, process.env.JWT_KEY as string, { expiresIn: "1d", });
        return res.json({ "token": token, role:"STUDENT" });
      }
      return res.status(404).json({ message: 'Authentication error' })

    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Authentication error' })
    }
  }

  teste = async (req: Request, res: Response) => {
    res.json({ "ok": "ok" });
  }

}
