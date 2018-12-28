import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import {ApplicantService} from '../../Service/applicant.service'
import {ExamService} from '../../Service/exam.service'
import {EmployeeService} from '../../Service/employee.service'
import { Applicant } from '../../Models/applicant';
import { Exam } from '../../Models/Exam';
import { ExamApplicant } from '../../Models/ExamApplicant';
import { EmployeeResourceCode } from '../../Models/EmployeeResourceCode';
import { ExamSupervisor } from '../../Models/ExamSupervisor';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit {

  constructor(private ExamService:ExamService,
              private ApplicantService: ApplicantService,
              private route: ActivatedRoute,
              private EmployeeService:EmployeeService,
              private formBuilder: FormBuilder,private router:Router) { }

  applicants:Applicant[];
  enrollApplicants:Applicant[];
  exam:Exam;
  private sub:any;
  id:number; 
  enrollExam:ExamApplicant; 
  employee:EmployeeResourceCode[]; 
  supervisorPanel:ExamSupervisor[];
  private supperviserForm : FormGroup;         

  ngOnInit() {
    this.sub=this.route.params.subscribe(params=>{
      this.id=params['id'];
    });

    this.supperviserForm = this.formBuilder.group({
      ResourceCode:[''],
    });

    this.ExamService.getExamById(this.id).subscribe((data:Exam)=>{
      this.exam=data;
      this.getAllApplicant(data.ProcessId);
      console.log(this.exam);
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    });

    this.ApplicantService.getEnrollApplicant(this.id).subscribe((data:Applicant[])=>{
      this.enrollApplicants=data;
      console.log(data);
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    })

    this.EmployeeService.getAllEmployee(this.id).subscribe((data:EmployeeResourceCode[])=>{
      this.employee=data;
      console.log(data);
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    })

    this.ExamService.getSupervisorPanel(this.id).subscribe((data:ExamSupervisor[])=>{
      this.supervisorPanel=data;
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    })

  }

  getAllApplicant(id){
    this.ApplicantService.getAllApplicantByProcessId(id,this.id).subscribe((data:Applicant[])=>{
      this.applicants=data;
      console.log(data);
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    })
  }

  enroll(appId){
    this.ExamService.enroll(appId,this.id).subscribe((data:any)=>{
      console.log(data);
      window.location.reload();
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    })
  }

  unEnroll(appId){
    this.ExamService.unEnroll(appId).subscribe((data:any)=>{
      console.log(data);
      window.location.reload();
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    })
  }

  addSupervisor(){
    this.ExamService.addSupervisor(this.supperviserForm.value.ResourceCode,this.id).subscribe((data:any)=>{
      console.log(data);
      window.location.reload();
    },(err : HttpErrorResponse)=>{
      this.router.navigate(['/error']);
    })
  }

  removeSupervisor(employeeId){
      this.ExamService.removeSupervisor(employeeId).subscribe((data:any)=>{
        console.log(data);
        window.location.reload();
      },(err : HttpErrorResponse)=>{
        this.router.navigate(['/error']);
      });
  }

}
