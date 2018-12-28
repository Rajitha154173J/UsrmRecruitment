export class ExamApplicant{
    public ExamId:number;
    public IsAttend:boolean;
    public IsSubmit:boolean;
    public IsMark:boolean;
    public IsCalled:boolean;
    public IsSendEmail:boolean;

    public ApplicantId:number;
    public ApplicantName:string;
    public ProcessId:number;
    public NIC:number;
    public Email:string;
    public CreatedAt:Date;
    public DateOfBirth:Date;
    public HomeAddress:string;
    public Mobile: number;
    public Gender:string;
    public Institute:string;

    public ExamName:string;
    public ExamDate:Date;
    public Duration:number;
    public CompletionStatus:boolean;
    public CreatedBy:number;
    public CreatedDate:Date;
}
