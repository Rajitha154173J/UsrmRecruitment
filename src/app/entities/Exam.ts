export class Exam{
    public ExamId? : number;
    public ExamName : string;
    public NoOfQuestions : number;
    public ExamDate : Date;
    public Duration : Date;
    public CompletionStatus : boolean;
    public CreatedDate : Date;
    public EditedDate? : Date;
    public CreatedBy : number;
    public EditedBy? : number;
    public ProcessId : number;
    public LevelId : number;
    public TypeId : number;
    public DesignationId : number;
}

export class Designation{
    public Id:number;
    public Designation:string;
}

export class ExamLevel{
    public LevelId:number;
    public LevelName:string;
}

export class QuestionType{
    public TypeId:number;
    public TypeName:string;
}