import ISlide from "./ISlide";
import IStudent from "./IStudent";

import ITeacher from "./ITeacher";

interface IClassroom {
    id?: number;
    name: string;
    students?: IStudent[]
    teacher: ITeacher
}

export default IClassroom;