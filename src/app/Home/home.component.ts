import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import {EmployeeService} from '../Exam/Service/employee.service'
import {ApplicantService} from '../Exam/Service/applicant.service'
import { Applicant } from '../Exam/Models/applicant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private EmployeeService:EmployeeService,
              private router : Router,
              private formBuilder: FormBuilder,
              private applicantService:ApplicantService) { }

  isLoad:boolean=false;
  isEmmployee:boolean=false;
  private externalLogin : FormGroup;
  applicant:Applicant;

  ngOnInit() {
    this.externalLogin  = this.formBuilder.group({
      Email:['']
    });

    this.EmployeeService.getGetResourceCode().subscribe((data:any)=>{
      console.log(data);
      this.isLoad=true;
      if(data!=0){
        this.isEmmployee=true;
        //this.router.navigate(['/startExam']);
      }
    })
  }

  login(){
    this.applicantService.getApplicantByEmail(this.externalLogin.value.Email).subscribe((data:Applicant)=>{
      this.applicant=data;
      if(this.applicant.ApplicantId!=0){
        this.router.navigate(['/startExam',this.applicant.ApplicantId]);
      }
    })
  }

}
