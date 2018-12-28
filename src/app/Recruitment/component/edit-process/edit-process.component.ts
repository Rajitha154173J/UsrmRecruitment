
import { DatePipe } from '@angular/common';
import { Designation } from './../../../Models/Designation';
import { ApplicantService } from 'src/app/Recruitment/service/applicant.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Process } from './../../../Models/Process';
import { ProcessService } from './../../service/process.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-process',
  templateUrl: './edit-process.component.html',
  styleUrls: ['./edit-process.component.css']
})
export class EditProcessComponent implements OnInit {
  id: String;
  process: Process;
  processForm: FormGroup;
  userId: number;
  designations: Designation;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private date: DatePipe, private route: ActivatedRoute, private proService: ProcessService, private fb: FormBuilder, private appService: ApplicantService) {
    this.appService.getCurrentUser().subscribe((result: any) =>
      this.userId = result);

    this.proService.getAllDestination().subscribe((result: Designation) =>
      this.designations = result);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.route.snapshot.paramMap.get('id'));
    this.proService.getProcessById(this.id).subscribe((result: Process) => {
      this.process = result;
      this.processForm.controls['ProcessName'].setValue(this.process.ProcessName);
      this.processForm.controls['Vacancies'].setValue(this.process.Vacancies);
      this.processForm.controls['DesignationId'].setValue(this.process.DesignationId);
      this.processForm.controls['CreatedBy'].setValue(this.process.CreatedBy);
      this.processForm.controls['adDate'].setValue(this.translateDate(this.process.AdDate));
      this.processForm.controls['Comment'].setValue(this.process.Comment);
      this.processForm.controls['updatedBy'].setValue(this.userId);
    });

    this.processForm = this.fb.group({
      ProcessName: [''],
      Vacancies: [''],
      DesignationId: [''],
      CreatedBy: [''],
      updatedBy: [''],
      Comment: [''],
      adDate: ['']

    });
  }

  updateProcess() {
    this.process.ProcessName = this.processForm.value.ProcessName;
    this.process.Vacancies = this.processForm.value.Vacancies;
    this.process.Comment = this.processForm.value.Comment;
    this.process.DesignationId = this.processForm.value.DesignationId;
    this.process.UpdatedBy = this.processForm.value.updatedBy;
    console.log(this.process);

    this.proService.update(this.process).subscribe((result: any) => {
      if (result) {
        location.reload();
        this.router.navigate(['/process']);

      } else {
        location.reload();
      }
    });
  }
  translateDate(date) {
    return this.date.transform(date, 'yyyy-MM-dd');
  }


}
