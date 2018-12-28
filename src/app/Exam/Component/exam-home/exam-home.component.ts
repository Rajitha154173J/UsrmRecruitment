import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {EmployeeService} from '../../Service/employee.service'

@Component({
  selector: 'app-exam-home',
  templateUrl: './exam-home.component.html',
  styleUrls: ['./exam-home.component.css']
})
export class ExamHomeComponent implements OnInit {

  constructor(private EmployeeService:EmployeeService,private router : Router) { }

  ngOnInit() {
    // this.EmployeeService.getGetResourceCode().subscribe((data:any)=>{
    //   console.log(data);
    //   if(data==0){
    //     this.router.navigate(['/deleteExam',3]);
    //   }
    // })
  }

}
