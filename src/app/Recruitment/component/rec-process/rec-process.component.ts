import { Router } from '@angular/router';

import { ProcessService } from 'src/app/Recruitment/service/process.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ApplicantService } from 'src/app/Recruitment/service/applicant.service';
import { Designation } from '../../../Models/Designation';
import { Process } from '../../../Models/Process';

@Component({
  selector: 'app-rec-process',
  templateUrl: './rec-process.component.html',
  styleUrls: ['./rec-process.component.css']
})
export class RecProcessComponent implements OnInit {

  designations: Designation[];
  proccessForm: FormGroup;
  designs = new Array();
  index: number;
  // details: Array<Process>;

  // tslint:disable-next-line:max-line-length
  constructor(private builder: FormBuilder, private applicant: ApplicantService, private processService: ProcessService, private router: Router) {

    // this.details=[];
    this.index = 0;
    this.applicant.getCurrentUser().subscribe((result: any) =>
      this.proccessForm.controls['CreatedBy'].setValue(result));

    this.processService.getAllDestination().subscribe((result: Designation[]) =>
      this.designations = result);

  }

  ngOnInit() {

    this.proccessForm = this.builder.group({
      ProcessName: [''],

      CreatedBy: [''],
      adDate: [''],
      Comment: [''],


      items: this.builder.array([this.createItem()])
    });

  }

  processCreate() {
    this.processService.addProcess(this.proccessForm.value).subscribe((result: any) => {
      if (result) {
        // tslint:disable-next-line:no-unused-expression
        this.router.navigate['/process'];
      } else {
        location.reload();
      }
    });
  }

  arrayOne(n: number) {

    this.designs = [];
    for (let x = 0; x < n; x++) {
      this.designs[x] = x + 1;
    }

  }

  createItem() {
    return this.builder.group({
      adUrl: [''],
      vacancy: [''],
      advertice: [''],
      DesignationId: ['']
    });
  }
  addNext() {
    this.index = this.index + 1 ;
    (this.proccessForm.controls['items'] as FormArray).push(this.createItem());
  }

  uploadAdvertice($event) {

    const arrayControl = this.proccessForm.get('items') as FormArray;

    //  console.log(arrayControl.at(0).value);
    const fileSelected: File = $event.target.files[0];
    this.processService.uploadFile(fileSelected)
      .subscribe((response) => {

        arrayControl.at(this.index).get('adUrl').setValue(response[this.index]);
         console.log(arrayControl.at(this.index).value);
         console.log(this.index);
      },
      (error) => {
        console.log('set any error actions...');
      });

  }
}
