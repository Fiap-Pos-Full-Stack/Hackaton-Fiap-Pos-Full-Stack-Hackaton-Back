import { Router, Request, Response } from 'express';
import { AppDataSource } from "../data-source";

import { teacherMiddleware, paramMiddleware } from '../middleware/auth';
import { CommentRepository } from '../repositories/comment.repository';
import { roles } from '../enums/roles';
import { ContentController } from '../controllers/content.controller';
import { ContentRepository } from '../repositories/content.repository';
import { StudentRepository } from '../repositories/student.repository';
import { TeacherRepository } from '../repositories/teacher.repository';
import { ClassroomRepository } from '../repositories/classroom.repository';
import IStudent from '@/interfaces/IStudent';

const init = Router();

init.get('/', async () => {

    const studentRepo = new StudentRepository()
    const aluno1 = await studentRepo.createStudent("aluno1", "aluno1", "Joao", "1234567")
    const aluno2 = await studentRepo.createStudent("aluno2", "aluno2", "Maria", "2234567")
    const aluno3 = await studentRepo.createStudent("aluno3", "aluno3", "Ana Clara", "3234567")
    const aluno4 = await studentRepo.createStudent("aluno4", "aluno4", "Matheus", "4234567")
    const aluno5 = await studentRepo.createStudent("aluno5", "aluno5", "Pietro", "5234567")
    const aluno6 = await studentRepo.createStudent("aluno6", "aluno6", "Felipe", "6234567")
    const aluno7 = await studentRepo.createStudent("aluno7", "aluno7", "Enzo", "7234567")
    const aluno8 = await studentRepo.createStudent("aluno8", "aluno8", "Alice", "8234567")

    const teacherRepo = new TeacherRepository()
    const prof1 = await teacherRepo.createTeacher("prof1", "prof1", "Carlos", "Biologia", "1234561")
    const prof2 = await teacherRepo.createTeacher("prof2", "prof2", "Marcia", "Portugues", "1234562")
    const prof3 = await teacherRepo.createTeacher("prof3", "prof3", "Carlos", "Historia", "1234563")

    const classRoomRepo = new ClassroomRepository()
    const class1 = await classRoomRepo.createClassRoom({ name: "Classe 1 - Biologia", students: [aluno1.id, aluno2.id, aluno4.id] as unknown as IStudent[], teacher: { id: prof1.id } })
    const class2 = await classRoomRepo.createClassRoom({ name: "Classe 2 - Portugues", students: [aluno3.id, aluno5.id] as unknown as IStudent[], teacher: { id: prof2.id } })
    const class3 = await classRoomRepo.createClassRoom({ name: "Classe 3 - Historia", students: [aluno6.id, aluno7.id, aluno8.id] as unknown as IStudent[], teacher: { id: prof3.id } })

    const contentRepo = new ContentRepository()
    contentRepo.createContent({
        name: "Conteudo para a classe 2", slides: [
            { "text": "Os verbos são palavras que expressam ações, estados e fenômenos da natureza. Exemplos: Corri 2 quilômetros pela manhã" },
            { "text": "Quando dois ou mais verbos juntos exercem a função de um verbo, temos uma locução verbal. As locuções verbais são formadas por um verbo auxiliar flexionado e um verbo principal (geralmente o último) no gerúndio, particípio ou infinitivo. "},
            { "text": "As conjugações verbais são três: 1ª conjugação: verbos terminados em “ar” ou com a vogal temática -A-, por exemplo: andar; 2ª conjugação: verbos terminados em “er”ou com a vogal temática -E-, por exemplo: fazer; 3ª conjugação: verbos terminados em “ir”ou com a vogal temática -I-, por exemplo: cair."},
            {"quiz": {
                    "question": "Quais as conjugações do verbo? ",
                    "option1": "Presente, pretérito e futuro.",
                    "option2": "1° ar 2° ir 3° er",
                    "option3": "1° ar 2° er 3° ir",
                    "option4": "Indicativo, subjuntivo e imperativo.",
                    "reason": "A certa é a 3 por....",
                    "rightOption": 3
                }
            }
        ], created: new Date(), teacher: { id: prof2.id }
    })


    contentRepo.createContent({
        name: "Conteudo para a classe 1", slides: [
            { "text": "Cobra é uma denominação genérica, utilizada frequentemente na língua portuguesa como sinônimo para serpente,[1] enquanto cobra-(de-)capelo designa serpentes (muito venenosas), da família Elapídeos, que, quando excitadas, dilatam a região cervical em jeito de capelo ou capuz de um monge (nas restantes línguas europeias, cobra designa as cobras-capelo, por truncamento a partir da palavra portuguesa)." },
            { "text": "A maior parte das cobras-capelo põe ovos e a maior parte delas os abandona pouco depois da ovoposição. No entanto, algumas espécies são ovovivíparas e retêm os ovos dentro dos seus corpos até se encontrarem prestes a nascer. Recentemente, foi confirmado que várias espécies de cobras-capelo desenvolvem os seus descendentes completamente dentro de si, nutrindo-os através de uma placenta e um saco amniótico."},
            { "text": "A retenção de ovos e os partos ao vivo são normalmente, mas não exclusivamente, associados a climas frios, sendo que a retenção dos descendentes dentro da fêmea permite-lhe controlar as suas temperaturas com maior eficácia do que se estes se encontrassem no exterior."},
            { "image": "imagem1"},
            {"quiz": {
                    "question": "Qual é o comportamento reprodutivo de algumas espécies de cobras-capelo?",
                    "option1": "Todas as cobras-capelo põem ovos e os abandonam logo após",
                    "option2": "Algumas espécies são ovovivíparas e retêm os ovos dentro dos seus corpos até o nascimento",
                    "option3": "Todas as cobras-capelo têm partos ao vivo e desenvolvem os descendentes dentro de si",
                    "option4": "As cobras-capelo nunca retêm os ovos e não têm partos ao vivo",
                    "reason": "A certa é a 2 por....",
                    "rightOption": 2
                }
            }
        ], created: new Date(), teacher: { id: prof1.id }
    })
});

export default init;


