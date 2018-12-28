import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Exam } from '../../Models/Exam';
import {ExamService} from '../../Service/exam.service'
import {EmployeeService} from '../../Service/employee.service'

@Component({
  selector: 'app-exa-start-page',
  templateUrl: './exa-start-page.component.html',
  styleUrls: ['./exa-start-page.component.css']
})
export class ExaStartPageComponent implements OnInit {

  constructor(private EmployeeService:EmployeeService,
              private router : Router,
              private route: ActivatedRoute,
              private examService:ExamService) { }

  private sub:any;
  applicantId:number;
  exams:Exam[];
  isStart:boolean=true;

  ngOnInit() {
    this.sub=this.route.params.subscribe(params=>{
      this.applicantId=params['id'];
    });

    this.examService.getExamsByApplicantId(this.applicantId).subscribe((data:Exam[])=>{
      this.exams=data;
      console.log(data);
    })
  }

  tryExam(exam){
      var available=this.chechExamAvailability(exam.ExamDate);
      if(available==true){
        this.isStart=false;
      }
      else{
        if(exam.TypeId==1){
          this.router.navigate(['/mExam',{exam:exam.ExamId,applicant:this.applicantId}]);
          console.log("mcq");
        }
        else{
          this.router.navigate(['/eExam',{exam:exam.ExamId,applicant:this.applicantId}]);
          console.log("essay");
        }
      }
  }

  chechExamAvailability(date){
    var time=new Date(date);
    var today=new Date();
    var diff =(time.getDate()-today.getDate());
    console.log(diff);
    if(diff>0){
      return true
    }
    else{
      return false;
    }
  }

}
