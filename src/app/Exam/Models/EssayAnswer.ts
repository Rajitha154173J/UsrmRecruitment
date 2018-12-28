import { Question } from '../Models/question';
export class EssayAnswer{
    public Answer:string;;
    public QuestionId:number;
    public ExamId : number;
    public ApplicantId:number;
    public Question:Question;
}