import { Request, Response, Router } from 'express';
import { ClassroomRepository } from '../repositories/classroom.repository';
import { CustomRequest } from '../middleware/auth';

type RankingType = {
  id:number,
  student: string,
  point: number
}
export class ClassroomController {

  private repository: ClassroomRepository;
  constructor(repository: ClassroomRepository) {
    this.repository = repository;
  }
  readRankingById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); 
    let rankingAux : RankingType[] = []
   try {
     const contents = await this.repository.getClassroomsRankingById(id);
     contents?.students?.forEach(student => {
         let studentPoints = 0
         student.studentsQuizs?.forEach(quiz => {
             if(quiz.markedOption == quiz?.quiz?.rightOption){
                 studentPoints++
             }
         })
         rankingAux.push({student:student.name || "", id:student.id,point:studentPoints})
     })
     return res.json(rankingAux.sort((a,b :RankingType ) => {
      if(a.point < b.point){
        return 1
      }
      return -1;
     }));
   }
   catch (error) {
     console.error(error)
     return res.status(500).json({ message: 'Internal Server Error' })
   }
 }
  readAll = async (req: Request, res: Response) => {
     // #swagger.description = 'Buscar lista de todos os posts'
     let page = String(req.query.page)
    try {
      const [contents, total] = await this.repository.getClassrooms();
      return res.json(contents);
    }
    catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  readByTeacher =  async (req: CustomRequest, res: Response) => {
    // #swagger.description = 'Criar um post'
   const teacherId = req._id
   try {
     if (teacherId) {
       const newPost = await this.repository.getClassroomsByTeacherId(teacherId)
       return res.status(201).json(newPost)
     }
     return res.status(500).json({ message: 'Invalid teacher' })

   }
   catch (error) {
     console.error(error);
     return res.status(500).json({ message: 'Internal Server Error' })
   }
 }


  create = async (req: CustomRequest, res: Response) => {
     console.log("criando turma")
    const {name,students} = req.body
    const teacherId = req._id
    if (!name) {
      return res.status(400).json({ mensagem: 'The name is mandatory' })
    }
    if (!students) {
      return res.status(400).json({ mensagem: 'The students is mandatory' })
    }
    try {
      if (teacherId) {
        const newPost = await this.repository.createClassRoom({ name: name, students: students ,teacher: { id: teacherId } })
        return res.status(201).json(newPost)
      }
      return res.status(500).json({ message: 'Invalid teacher' })

    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

}
