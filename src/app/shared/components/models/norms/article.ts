import { Chapter } from './chapter';

export class Article {
    constructor(public id: String, public title: String, public questions: String, public article: Article, public idChapter: String) { }
}
