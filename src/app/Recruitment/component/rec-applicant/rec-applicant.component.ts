import { Process } from './../../../Models/Process';
import { ProcessService } from './../../service/process.service';
import { ApplicantService } from 'src/app/Recruitment/service/applicant.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-rec-applicant',
  templateUrl: './rec-applicant.component.html',
  styleUrls: ['./rec-applicant.component.css']
})
export class RecApplicantComponent implements OnInit {

  // selectedFile: File = null;
  proccesses: Process[];
  applicationForm: FormGroup;
  processDesignations: any[];
  hide: boolean;
  fileToUpload: File = null;
  constructor(private builder: FormBuilder, private applicant: ApplicantService, private procesService: ProcessService) {

    this.applicant.getCurrentUser().subscribe((result: any) =>
      this.applicationForm.controls['CreatedBy'].setValue(result));

    this.procesService.getAllProccess().subscribe((result: Process[]) => {
      this.proccesses = result;
      // console.log(this.proccesses);
    });

    this.hide = true;
  }

  ngOnInit() {

    this.applicationForm = this.builder.group({
      ApplicantName: [''],
      ProcessID: [''],
      CreatedBy: [''],
      CVLink: [''],
      CV: [''],
      DateOfBirth: [''],
      Email: [''],
      Gender: [''],
      HomeAddress: [''],
      Mobile: [''],
      NIC: [''],
      Institute: [''],
      DesignationID: ['']

    });

  }

  applicationCreate() {
    // console.log(this.proccesses[this.applicationForm.value['ID']].ProcessId);
    console.log(this.applicationForm.value);
    this.applicant.addApplication(this.applicationForm.value).subscribe((result: any) => {
      if (result) {
        // location.reload();
        console.log(result);
      } else {
        // location.reload();
        console.log(result);

      }

    });

  }

  getDesignation(event) {
    // console.log(this.proccesses[this.applicationForm.value['index']].processDesignations);
    // console.log(event.target.value);
    this.procesService.getProcessDesignations(event.target.value).subscribe((res: any) => {
      this.processDesignations = res;

      if (this.processDesignations.length === 0) {
        this.hide = true;
      } else {
        this.hide = false;
      }
    });
  }
  onFileChange($event) {

const fileSelected: File = $event.target.files[0];
this.applicant.uploadFile(fileSelected)
.subscribe( (response) => {

  this.applicationForm.controls['CVLink'].setValue(response[0]);
  // console.log(this.applicationForm.value);
 },
  (error) => {
    console.log('set any error actions...');
  });

 }

}

