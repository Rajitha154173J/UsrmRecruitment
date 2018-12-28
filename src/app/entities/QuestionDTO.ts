export class QuestionDTO{
    public QuestionId? :number;
    public TypeId :number;
    public LevelId:number;
    public CreatedDate:Date;
    public CreatedBy :number;
    public LastModifiedBy? :number;
    public LastModifiedDate?:Date;
    public QuestionText:string;
    public SampleAnwser?:string;
    public SudegstionOne?:string;
    public SudegstionTwo? :string;
    public SudegstionThree?:string;
    public SudegstionFour? :string;
    public MCQAnswers? : number[];
    public SubjectId? : number;
    public DesignationId? : number;

    // QuestionId :number;
    // TypeId :number;
    // LevelId:number;
    // CreatedDate:Date;
    // CreatedBy :number;
    // LastModifiedBy :number;
    // LastModifiedDate:Date;
    // QuestionText:string;
    // SampleAnwser:string;
    // SudegstionOne:string;
    // SudegstionTwo :string;
    // SudegstionThree:string;
    // SudegstionFour :string;
}
