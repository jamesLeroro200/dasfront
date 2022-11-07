import { Article } from './article';

export class Chapter {
    constructor(public id: string,public title : String,public articles : Article[]){}
}
