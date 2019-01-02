import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {NgForm} from '@angular/forms';

import { ApplicantProgressService } from '../../../services/Applicant-Progress.service';
import {ExamService} from '../../../Exam/Service/exam.service'

@Component({
  selector: 'app-applicant-progress',
  templateUrl: './applicant-progress.component.html',
  styleUrls: ['./applicant-progress.component.css']
})
export class ApplicantProgressComponent implements OnInit {

  constructor(private applicantProgressComponent:ApplicantProgressService
              ,private formBuilder: FormBuilder
              ,private examservice:ExamService) { }

  applicantData:any;
  isLoad:boolean=false;
  currentInterview:any;
  markShettIndex:number;
  currentmarkSheet:any;
  currentExam:any;
  private markForm : FormGroup;
  markLoad:boolean=false;
  addMountForm : NgForm

  ngOnInit() {
        this.applicantProgressComponent.getApplicantProgress(1002).subscribe((data:any)=>{
          this.applicantData=data;
          console.log(this.applicantData.Applicant.ApplicantId);
          //this.currentmarkSheet=data.Interview[0].Mark.MarkScors;
          this.isLoad=true;
        });

        this.markForm  = this.formBuilder.group({
          Marks:['']
        });
  }

  setDate(time){
    time=new Date(time);
    return time;
}

setData(interview){
   this.currentInterview=interview;
   this.markShettIndex=0;
   this.currentmarkSheet=this.currentInterview.Mark[this.markShettIndex];
   console.log(this.currentmarkSheet);
   this.markLoad=true;
}

nextMarkSheet(){
  if(this.markShettIndex<this.currentInterview.Mark.length)
  {
    this.markShettIndex++;
    this.currentmarkSheet=this.currentInterview.Mark[this.markShettIndex];
    console.log(this.currentmarkSheet);
  }
}

setExamData(exam){
  this.currentExam=exam;
  console.log(this.currentExam);
}

manualEnterExamMarks(ngMarkForm:NgForm){
  const data:any={
    ApplicantId:this.applicantData.Applicant.ApplicantId,
    ExamId:this.currentExam.Exam.ExamId,
    Result:ngMarkForm.value.Marks
  };
  console.log(data);
  this.examservice.uploadMarksManual(data).subscribe((data:any)=>{
    console.log(data);
  });
}

}
