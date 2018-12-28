import { ApplicantDetail } from './ApplicantDetail';



export class  ProcessDetail {
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
  public Designation: string;
  public applicant: ApplicantDetail [];
}
