import { Applicant } from '../Models/applicant';

export class ExamEvent{
    public ApplicantId:number;
    public ExamId : number;
    public IsAttend:boolean;
    public IsSubmit:boolean;
    public IsMark:boolean;
    public Applicant:Applicant;
}