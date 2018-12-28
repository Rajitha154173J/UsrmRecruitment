import { Process } from './../../../Models/Process';
import { ProcessService } from './../../service/process.service';

import { FormGroup, FormBuilder } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicantService } from 'src/app/Recruitment/service/applicant.service';
import { Applicant } from '../../../Models/Applicant';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-applicant',
  templateUrl: './edit-applicant.component.html',
  styleUrls: ['./edit-applicant.component.css']
})
export class EditApplicantComponent implements OnInit {

  id: string;
  applicant: Applicant;
  updateApplicationForm: FormGroup;

  processDetail: Process;
  proccesses: Process[];
  UserId: number;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private applicantService: ApplicantService, private fb: FormBuilder, private datePipe: DatePipe, private processService: ProcessService) {
    this.applicantService.getCurrentUser().subscribe((result: any) =>
      this.UserId = result);

  }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.applicantService.getApplicantById(this.id).subscribe((result: Applicant) => {
      this.applicant = result;

      console.log(result);

      this.updateApplicationForm.controls['ApplicantId'].setValue(this.id);
      this.updateApplicationForm.controls['ApplicantName'].setValue(this.applicant.ApplicantName);
      this.updateApplicationForm.controls['CreatedBy'].setValue(this.applicant.CreatedBy);
      this.updateApplicationForm.controls['ProcessID'].setValue(this.applicant.ProcessID);
      this.updateApplicationForm.controls['Email'].setValue(this.applicant.Email);
      this.updateApplicationForm.controls['Gender'].setValue(this.applicant.Gender);
      this.updateApplicationForm.controls['HomeAddress'].setValue(this.applicant.HomeAddress);
      this.updateApplicationForm.controls['Mobile'].setValue(this.applicant.Mobile);
      this.updateApplicationForm.controls['NIC'].setValue(this.applicant.NIC);
      this.updateApplicationForm.controls['Institute'].setValue(this.applicant.Institute);
      this.updateApplicationForm.controls['DateOfBirth'].setValue(this.transformDate(this.applicant.DateOfBirth));

    }


    );
    this.processService.getAllProccess().subscribe((result: Process[]) => {
      this.proccesses = result;

    });

    this.updateApplicationForm = this.fb.group({
      ApplicantId: [''],
      ApplicantName: [''],
      ProcessID: [''],
      CreatedBy: [''],
      CVLink: [''],
      DateOfBirth: [''],
      Email: [''],
      Gender: [''],
      HomeAddress: [''],
      Mobile: [''],
      NIC: [''],
      Institute: ['']


    });
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  Update() {
    this.applicant.ApplicantName = this.updateApplicationForm.value.ApplicantName;
    this.applicant.DateOfBirth = this.updateApplicationForm.value.DateOfBirth;
    this.applicant.Email = this.updateApplicationForm.value.Email;
    this.applicant.HomeAddress = this.updateApplicationForm.value.HomeAddress;
    this.applicant.Gender = this.updateApplicationForm.value.Gender;
    this.applicant.ProcessID = this.updateApplicationForm.value.ProcessID;
    this.applicant.Mobile = this.updateApplicationForm.value.Mobile;
    this.applicant.NIC = this.updateApplicationForm.value.NIC;
    this.applicant.Institute = this.updateApplicationForm.value.Institute;
    this.applicant.UpdateBy = this.UserId;

    console.log(this.applicant);
    this.applicantService.updateApplicant(this.applicant).subscribe((result: boolean) => {
      if (result) {

        console.log(result);
      } else {

        console.log(result);
      }
    }
    );
  }

  getProcess(id) {
    this.processService.getProcessById(id).subscribe((result: Process) =>
      this.processDetail = result);
  }

}
