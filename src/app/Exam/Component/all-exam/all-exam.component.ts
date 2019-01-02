import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

import { Exam } from '../../Models/Exam';
import {ExamService} from '../../Service/exam.service'

@Component({
  selector: 'app-all-exam',
  templateUrl: './all-exam.component.html',
  styleUrls: ['./all-exam.component.css']
})
export class AllExamComponent implements OnInit {

  exams:Exam[];
  exam:Exam;
  deleteItem:any;

  constructor(private ExamService: ExamService,private router : Router) { }

  ngOnInit() {
    this.ExamService.getAllExam().subscribe((data:Exam[])=>{
      this.exams=data;
      console.log(this.exams);
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
     })
  }

  editExam(id){
    this.router.navigate(['/editExam',id]);
  }

  deleteExam(){
    //this.router.navigate(['/deleteExam',id]);
    // this.ExamService.deleteExam(id).subscribe((data:any)=>{
    //   console.log(data+" popup");
    // },(err:HttpErrorResponse)=>{
    //   this.router.navigate(['/error']);
    // })
    console.log(this.deleteItem);
    this.ExamService.deleteExam(this.deleteItem).subscribe((data:any)=>{
      console.log(data);
      if(data==true){
      window.location.reload();
      }
      else{
        //this.deleteError=true;
      }
    },(err:HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    })
  }

  addExam(){
    this.router.navigate(['/addExam']);
  }

  examDetail(id){
    this.router.navigate(['/examDetail',id]);
  }

  setDate(time){
       time=new Date(time);
       return time;
  }

  setDeleteItem(id){
    this.deleteItem=id;
    console.log(id);
  }

}
