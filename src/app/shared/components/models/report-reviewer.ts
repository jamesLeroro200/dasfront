import { Norm } from './norms/norm';

export class ReportReviewer {
    id: String; name: String; version: String; description: String; status: boolean; questions: String; norm:  Norm;
    constructor(id: String, name: String, version: String, description: String, status: boolean, questions: String, norm: Norm) { }
}
