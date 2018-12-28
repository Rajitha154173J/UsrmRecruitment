export class Process {
  public ProcessId: number;
  public Comment: string;
  public ProcessName: string;
  public Vacancies: number;
  public CreatedBy: number;
  public UpdatedBy: number;
  public UpdatedAt: string;
  public CreatedAt: string;
  public AdDate: string;
  public DesignationId: number;
  public adUrl: String;
  public vacancy: number;
  public processDesignations: any[];

  constructor(DesignationId, vacancy) {

    this.DesignationId = DesignationId;
    this.vacancy = vacancy;
  }
}
