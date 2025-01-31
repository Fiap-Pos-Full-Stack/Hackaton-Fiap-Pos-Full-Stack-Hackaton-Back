import { Request, Response, Router } from 'express';
import { ContentRepository } from '../repositories/content.repository';
import { CustomRequest } from '../middleware/auth';
import { CommentRepository } from '../repositories/comment.repository';
import { StudentDoQuizRepository } from '../repositories/student-do-quiz.entity.repository';
import Groq from "groq-sdk";

export class QuizController {

  private repository: StudentDoQuizRepository;
  private gptClient;
  constructor(repository: StudentDoQuizRepository) {
    this.repository = repository;
    console.log(process.env['AI_API_KEY'])
    this.gptClient = new Groq({ apiKey: process.env.AI_API_KEY });

    
  }
  readAll = async (req: Request, res: Response) => {
    try {
      const [contents, total] = await this.repository.getStudentDoQuizs();
      return res.json(contents);
    }
    catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  responseQuiz = async (req: CustomRequest, res: Response) => {
     // #swagger.description = 'Criar um post'
    const {markedOption} = req.body
    const quizId = parseInt(req.params.id); 
    const studentId = req._id
    if (!markedOption) {
      return res.status(400).json({ mensagem: 'The markedOption is mandatory' })
    }

    try {
      if (studentId) {
        const newPost = await this.repository.createContent({ markedOption: markedOption },quizId,studentId)
        return res.status(201).json(newPost)
      }
      return res.status(500).json({ message: 'Invalid teacher' })

    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  generateQuiz = async (req: CustomRequest, res: Response) => {
    // #swagger.description = 'Criar um post'
   const {content} = req.body
   const quizId = parseInt(req.params.id); 
   const teacherId = req._id
   if (!content) {
     return res.status(400).json({ mensagem: 'The content is mandatory' })
   }

   try {
     if (teacherId) {
      const chatCompletion = await this.gptClient.chat.completions.create({
        messages: [
          {
            role: "user",
            content: "Gere 1 e somente 1 quiz em formato json de 4 alternativas sobre o seguinte conteudo " + content + ". Por favor formate com os campos 'pergunta' para a pergunta, 'opcao1', 'opcao2', 'opcao3', 'opcao4' para as opcoes e 'resposta' para a resposta",
          },
        ],
        model: "llama-3.3-70b-versatile",
      });
      let finalJson = ""
      if(chatCompletion.choices[0]?.message?.content ){
        let test = chatCompletion.choices[0]?.message?.content.split("{")
        let jsonAux = "{" + test[1]
        let jsonFinalAux = jsonAux.split("}")
        console.log("test",jsonFinalAux[0])
        finalJson = JSON.parse(jsonFinalAux[0] + "}");
        console.log("obj",finalJson)

      }
       return res.status(201).json(finalJson)
     }
     return res.status(500).json({ message: 'Invalid teacher' })

   }
   catch (error) {
     console.error(error);
     return res.status(500).json({ message: 'Internal Server Error' })
   }
 }
}
