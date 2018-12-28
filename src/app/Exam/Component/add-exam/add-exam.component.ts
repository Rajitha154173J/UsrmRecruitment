import { Component, OnInit, NgModule } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

import {ProcessService} from '../../Service/process.service'
import {ExamService} from '../../Service/exam.service'
import { Process } from '../../Models/process';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private ProcessService: ProcessService,
              private ExamService: ExamService,
              private router : Router) { }

  private examForm : FormGroup;
  process:Process[];

  datePickerConfig = {
    firstDayOfWeek:"mo",
    format: "DD-MMM-YYYY hh:mm:A",
  }
    
  ngOnInit() {
    this.examForm = this.formBuilder.group({
      ExamName:[null, Validators.required],
      NoOfQuestions:[null, Validators.required],
      ExamDate:[null, Validators.required],
      Duration:[null, Validators.required],
      ProcessId:[null, Validators.required],
      LevelId:[null, Validators.required],
      TypeId:[null, Validators.required]
    });

    this.ProcessService.getAllProcess().subscribe((data:Process[])=>{
      this.process=data;
      console.log(data);
    },(err : HttpErrorResponse)=>{
      console.log(err);
     });


  }

  isFieldValid(field: string) {
    return !this.examForm.get(field).valid && this.examForm.get(field).touched;
  }
  displayFieldCss(field: string) {
    return {
      'input-validation-error': this.isFieldValid(field)
    };
  }

  onSubmit(){
    if (this.examForm.valid) {
      this.ExamService.registerExam(this.examForm.value).subscribe((data:any)=>{
        console.log(data);
        if(data==true){
          this.router.navigate(['/allExam']);
        }
      },(err : HttpErrorResponse)=>{
        this.router.navigate(['/error']);
      })
    } else {
      this.validateAllFormFields(this.examForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
