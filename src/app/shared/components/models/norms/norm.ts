import { Chapter } from './chapter';

export class Norm {
    constructor(public id: string, public name: String, public version: String, public description: String, public chapters: Array<Chapter>, 
        public status: boolean, public price: number,public reviewerOneDeadline: number,public reviewerTwoDeadline: number,
        public validityPeriod: number) { }
}
