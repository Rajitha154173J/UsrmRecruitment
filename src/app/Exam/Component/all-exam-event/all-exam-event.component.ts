import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import {ExamService} from '../../Service/exam.service'
import { Exam } from '../../Models/Exam';

@Component({
  selector: 'app-all-exam-event',
  templateUrl: './all-exam-event.component.html',
  styleUrls: ['./all-exam-event.component.css']
})
export class AllExamEventComponent implements OnInit {

  constructor(private ExamService:ExamService,private router : Router) { }

  exams:Exam[];
  isEvent:boolean=false;

  ngOnInit() {
    this.ExamService.getExamForMark().subscribe((data:Exam[])=>{
      this.exams=data;
      if(data.length!=0){
        this.isEvent=true;
      }
      console.log(data);
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    })
  }

  getExamEvent(examId){
    this.router.navigate(['/examEvent',examId]);
  }

  setDate(time){
    time=new Date(time);
    return time.toString().substring(4, 15);
  }

}
