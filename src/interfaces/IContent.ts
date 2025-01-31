import ISlide from "./ISlide";

import ITeacher from "./ITeacher";

interface IContent {
    id?: number;
    name: string;
    created: Date; // Creation date
    teacher: ITeacher
    slides: ISlide[]
}

export default IContent;