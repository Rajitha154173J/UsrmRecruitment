import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

import {ProcessService} from '../../Service/process.service'
import {ExamService} from '../../Service/exam.service'
import { Process } from '../../Models/process';
import { Exam } from '../../Models/Exam';


@Component({
  selector: 'app-edite-exam',
  templateUrl: './edite-exam.component.html',
  styleUrls: ['./edite-exam.component.css'],
  providers: [DatePipe]
})
export class EditeExamComponent implements OnInit {

  constructor(private ExamService:ExamService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ProcessService: ProcessService,
    private router:Router,
    private datePipe: DatePipe) { }

  private sub:any;
  id:number;
  private examForm : FormGroup;
  process:Process[];
  exam:Exam;

  datePickerConfig = {
    firstDayOfWeek:"mo",
    format: "DD-MMM-YYYY hh:mm:A",
  }

  ngOnInit() {
    this.sub=this.route.params.subscribe(params=>{
      this.id=params['id'];
    });

    this.ExamService.getExamById(this.id).subscribe((data:Exam)=>{
      this.exam=data;
      this.updateFormData();
      console.log(this.exam);
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    });

    this.examForm = this.formBuilder.group({
      ExamName:[''],
      NoOfQuestions:[''],
      ExamDate:[''],
      Duration:[''],
      ProcessId:[''],
      LevelId:[''],
      TypeId:['']
    });

    this.ProcessService.getAllProcess().subscribe((data:Process[])=>{
      this.process=data;
      console.log(data);
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
     });

  }

  updateFormData() {
    //var time = new Date(this.exam.ExamDate);
    //console.log(this.datePipe.transform(time,"yyyy-MM-dd"));
    this.examForm.patchValue({
      ExamName:this.exam.ExamName,
      NoOfQuestions:this.exam.NoOfQuestions,
      ExamDate:this.datePipe.transform(this.exam.ExamDate,"dd-MMM-yyyy hh:mm:aa"),
      Duration:this.exam.Duration,
      ProcessId:this.exam.ProcessId,
      LevelId:this.exam.LevelId,
      TypeId:this.exam.TypeId
    });
  }

  editExam(){
    this.exam.ExamName=this.examForm.value.ExamName;
    this.exam.NoOfQuestions=this.examForm.value.NoOfQuestions;
    this.exam.ExamDate=this.examForm.value.ExamDate;
    this.exam.Duration=this.examForm.value.Duration;
    this.exam.ProcessId=this.examForm.value.ProcessId;
    this.exam.LevelId=this.examForm.value.LevelId;
    this.exam.TypeId=this.examForm.value.TypeId;
    console.log(this.exam);
    this.ExamService.editExam(this.exam).subscribe((data:any)=>{
      console.log(data);
      if(data==true)
      this.router.navigate(['/allExam']);
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    })
  }

}
