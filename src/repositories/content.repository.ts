
import Content from "../entities/content.entity";
import IContent from "../interfaces/IContent";
import { AppDataSource } from "../data-source";


export class ContentRepository {
    private repository = AppDataSource.getRepository(Content);

    getContents = (page:number): (Promise<[IContent[], number]>) => {
        return this.repository.findAndCount({
            relations: { teacher: true, },
            select: { teacher: { username: true, id: true } },
            order: {slides: {id:"ASC"}}
        });
    }
    getContentById = (id: number): Promise<IContent| null> => {
        return this.repository.findOne({
            where: { id },
            relations: { teacher: true,slides:true },
            select: { teacher: { username: true, id: true } },
            order: {slides: {id:"ASC"}}
            
        });
    };
    getContentByTeacherId = (id: number): Promise<IContent[] | null> => {
        return this.repository.find({
            where: { teacher: { id } },
            relations: { teacher: true, },
            select: { teacher: { username: true, id: true } },
            order: {slides: {id:"ASC"}}
        });
    };
    createContent = async (content: IContent): Promise<IContent> => {
        const {
            name,
            created,
        } = content
        const newContent = this.repository.create({
            name,
            created:created,
            teacher: { id: content.teacher.id },
            slides:  content.slides
        });
        return await this.repository.save(newContent);
    };
    updateContent= async (id: number, userId :number,updatedData: Partial<IContent>): Promise<IContent | null> => {
        await this.repository.update(id, updatedData);
        const updatedContent = await this.repository.findOne({ where: { id } });
        if (updatedContent != null) {
            this.repository.merge(updatedContent, updatedData);
            const res = this.repository.save(updatedContent);
            return res;
        }
        return null

    };

    deleteContent = async (id: number,userId :number): Promise<boolean> => {
        
        const deleteResult = await this.repository.delete(id);
        return deleteResult.affected !== 0;
    };

}

export default {
    ContentRepository
};