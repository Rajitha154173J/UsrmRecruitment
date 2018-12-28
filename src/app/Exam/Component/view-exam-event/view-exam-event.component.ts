import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import {ExamService} from '../../Service/exam.service'
import { ExamEvent } from '../../Models/ExamEvent';

@Component({
  selector: 'app-view-exam-event',
  templateUrl: './view-exam-event.component.html',
  styleUrls: ['./view-exam-event.component.css']
})
export class ViewExamEventComponent implements OnInit {

  constructor(private ExamService:ExamService,
              private route: ActivatedRoute,
              private router:Router) { }
  
  private sub:any;
  id:number; 
  events:ExamEvent[];           

  ngOnInit() {
    this.sub=this.route.params.subscribe(params=>{
      this.id=params['id'];
    });
    
    this.ExamService.getExamEvent(this.id).subscribe((data:ExamEvent[])=>{
      this.events=data;
      console.log(data);
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    })
  }

  startMarking(applicantId){
    console.log(applicantId);
    this.router.navigate(['/evaluate',{examId:this.id,applicantId:applicantId}]);
  }

}
