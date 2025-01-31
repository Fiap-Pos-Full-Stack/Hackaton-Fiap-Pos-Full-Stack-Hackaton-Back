import { Request, Response } from 'express';
import { TEACHER_PER_PAGE, TeacherRepository } from '../repositories/teacher.repository';
import * as jwt from 'jsonwebtoken';
import { CustomRequest } from '../middleware/auth';
import { roles } from '../enums/roles';
import { PaginationRequest } from '../interfaces/IPagionationRequest';


export class TeacherController {

  private repository: TeacherRepository;

  constructor(repository: TeacherRepository) {
    this.repository = repository;
  }

  readAll = async (req: CustomRequest, res: Response) => {
    // #swagger.description = 'Buscar lista de todos os professor'
    let page = String(req.query.page)
   try {
     const [teachers,total] = await this.repository.getTeachers(parseInt(page));
     res.set("Access-Control-Expose-Headers","*")
     res.set("X-Total-Count", String(total));
     res.set("X-Per-Page", String(TEACHER_PER_PAGE));
     res.set("X-Total-Pages", String(Math.ceil(total/TEACHER_PER_PAGE)));
     
     return res.json(teachers);
   }
   catch (error) {
     console.error(error)
     return res.status(500).json({ message: 'Internal Server Error' })
   }
 }
 readId = async (req: Request, res: Response) => {
  // #swagger.description = 'Buscar um professor por um id especifico'
 try {
   const id = parseInt(req.params.id); 
   const post = await this.repository.getTeacherById(id);
   if (!post) {
     return res.status(404).json({ message: 'Teacher not found' });
   }
   return res.json(post);
 } catch (error) {
   console.error(error)
   return res.status(500).json({ message: 'Internal Server Error' });
 }
}

  create = async (req: CustomRequest, res: Response) => {
    // #swagger.description = 'Criar um professor'
    const { user, password, name } = req.body
    const teacherId = req._id
    if (!user) { return res.status(400).json({ mensagem: 'The user is mandatory' }) }
    if (!password) { return res.status(400).json({ mensagem: 'The password is mandatory' }) }
    if (!name) { return res.status(400).json({ mensagem: 'The name is mandatory' }) }
    try {
      if (teacherId) {
        const newTeacher = await this.repository.createTeacher(user, password,name)
        return res.status(201).json(newTeacher)
      }
      return res.status(500).json({ message: 'Invalid teacher' })

    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  update = async (req: CustomRequest, res: Response) => {
    // #swagger.description = 'Atualizar um professor'
    const { user, password, name } = req.body
    const teacherId = req._id
    const { id } = req.params;
    if (!user) { return res.status(400).json({ mensagem: 'The user is mandatory' }) }
    if (!password) { return res.status(400).json({ mensagem: 'The password is mandatory' }) }
    if (!name) { return res.status(400).json({ mensagem: 'The name is mandatory' }) }
    try {
      if (teacherId) {
        const newTeacher = await this.repository.updateTeacher(parseInt(id), teacherId, { username: user, password: password, name:name })
        if (newTeacher) {
          return res.status(200).json(newTeacher)
        }
        return res.status(404).json({ message: 'Teacher not found' })
      }
      return res.status(500).json({ message: 'Invalid teacher' })

    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  delete = async (req: CustomRequest, res: Response) => {
    // #swagger.description = 'Deleter um professor pelo id'
    try {
      const { id } = req.params;
      const teacherId = req._id
      if (!teacherId) {
        return res.status(404).json({ message: 'Invalid Teacher' });
      }
      const isDeleted = await this.repository.deleteTeacher(parseInt(id));
      if (isDeleted) {
        return res.status(204).json({ message: 'Teacher successfully removed' });
      }
      return res.status(404).json({ message: 'Teacher not found' })

    }
    catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

}
