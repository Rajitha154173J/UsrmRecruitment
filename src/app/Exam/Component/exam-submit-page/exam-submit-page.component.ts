import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {ExamService} from '../../Service/exam.service';

@Component({
  selector: 'app-exam-submit-page',
  templateUrl: './exam-submit-page.component.html',
  styleUrls: ['./exam-submit-page.component.css']
})
export class ExamSubmitPageComponent implements OnInit {

  constructor(private examService:ExamService,
              private router:Router) { }

  topTen:any[];
  currentAvg:number;

  ngOnInit() {
    this.examService.getCurrentAvg().subscribe((data:any)=>{
      this.currentAvg=data;
      console.log(data);
    })

    this.examService.getTopTen().subscribe((data:any)=>{
      this.topTen=data;
      this.topTen=this.topTen.sort(this.predicateBy("avarage"));
      console.log(this.topTen);
    })
  }

  tryQuize(){
    this.router.navigate(['/home']);
  }


  predicateBy(prop){
    return function(a,b){
       if( a[prop] > b[prop]){
           return -1;
       }else if( a[prop] < b[prop] ){
           return 1;
       }
       return 0;
    }
 }

}
