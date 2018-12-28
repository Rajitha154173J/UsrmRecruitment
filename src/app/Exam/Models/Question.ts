export class Question{
    public QuestionId :number;
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
}