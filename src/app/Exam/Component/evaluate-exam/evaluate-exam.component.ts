import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import {ExamService} from '../../Service/exam.service'
import { EssayAnswer } from '../../Models/EssayAnswer';
import { ExamResult } from '../../Models/examResult';

@Component({
  selector: 'app-evaluate-exam',
  templateUrl: './evaluate-exam.component.html',
  styleUrls: ['./evaluate-exam.component.css']
})
export class EvaluateExamComponent implements OnInit {

  constructor(private examService:ExamService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router:Router) { }

  private sub:any;
  examId:number;
  applicantId:number;
  answers:EssayAnswer[];
  currentAnswer:EssayAnswer;
  private marksForm : FormGroup;
  massege:any;
  marks:any[];
  index:number;
  noOfAnswers:number;
  result:ExamResult;

  ngOnInit() {
    this.sub=this.route.params.subscribe(params=>{
      this.examId=params['examId'];
      this.applicantId=params['applicantId'];
    });

    this.marksForm  = this.formBuilder.group({
      Marks:['']
    });

    this.examService.getAnswersForMark(this.examId,this.applicantId).subscribe((data:EssayAnswer[])=>{
      this.answers=data;
      this.currentAnswer=data[0];
      this.index=0;
      this.noOfAnswers=data.length;
      console.log(data);
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    });
    this.marks=[];
    this.result = new ExamResult();
  }

  next(){
    if(this.marksForm.value.Marks==''){
      console.log("1234");
    }
    else{
      this.marks[this.index]=this.marksForm.value.Marks;
      this.index++;
      this.currentAnswer=this.answers[this.index];
      this.marksForm.setValue({
        Marks:''
      });
      console.log(this.marks);
    }
  }

  submit(){
    this.next();
    var total=0;
    this.marks.forEach(element => {
      total=total+element;
    });
    total=(total*100)/(this.noOfAnswers*100);
    this.result.ApplicantId=this.applicantId;
    this.result.ExamId=this.examId;
    this.result.Result=Math.round(total);
    console.log(this.result);
    this.examService.addResult(this.result).subscribe((data:any)=>{
      console.log(data);
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    })
  }

}
