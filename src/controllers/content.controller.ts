import { Request, Response, Router } from 'express';
import { ContentRepository } from '../repositories/content.repository';
import { CustomRequest } from '../middleware/auth';
import { CommentRepository } from '../repositories/comment.repository';


export class ContentController {

  private repository: ContentRepository;
  constructor(repository: ContentRepository) {
    this.repository = repository;
  }
  readAllByTeacher = async (req: CustomRequest, res: Response) =>{
    const teacher = req._id
    try {
      const contents = await this.repository.getContentsByTeacher(teacher||0);
      return res.json(contents);
    }
    catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  getContentsByStudent  = async (req: CustomRequest, res: Response) =>{
    const studentId = req._id
    try {
     return res.json([]);
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
      const [contents, total] = await this.repository.getContents(parseInt(page));
      return res.json(contents);
    }
    catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  create = async (req: CustomRequest, res: Response) => {
     // #swagger.description = 'Criar um post'
    const {name,slides} = req.body
    const teacherId = req._id
    if (!name) {
      return res.status(400).json({ mensagem: 'The name is mandatory' })
    }
    if (!slides) {
      return res.status(400).json({ mensagem: 'The slides is mandatory' })
    }
    try {
      if (teacherId) {
        const newPost = await this.repository.createContent({ name: name, slides: slides,created:new Date() ,teacher: { id: teacherId } })
        return res.status(201).json(newPost)
      }
      const newPost = await this.repository.createContent({ name: name, slides: slides,created:new Date() ,teacher: { id: 1 } })
      return res.status(500).json({ message: 'Invalid teacher' })

    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  readId = async (req: Request, res: Response) => {
   try {
     const id = parseInt(req.params.id); 
     const content = await this.repository.getContentById(id);
     if (!content) {
       return res.status(404).json({ message: 'Content not found' });
     }
     return res.json(content);
   } catch (error) {
     console.error(error)
     return res.status(500).json({ message: 'Internal Server Error' });
   }
  }
}
