import { Component, OnInit } from '@angular/core';
import { receptService } from '../../Services/recept.service';
import { ExamApplicant } from '../../Entities/ExamApplicant';
import { InterviewApplicant } from '../../Entities/InterviewApplicant';
import { SharedApplicantService } from '../../services/shared-applicant.service';
import { Router } from '@angular/router';
import { ViewChild } from "@angular/core";
import { ViewApplicantComponent } from "../view-applicant/view-applicant.component";
import { ViewInterviewComponent } from "../view-interview/view-interview.component";
import { ViewExamComponent } from "../view-exam/view-exam.component";
import * as $ from 'jquery';

@Component({
  selector: 'app-all-applicants',
  templateUrl: './all-applicants.component.html',
 // styleUrls: ['./all-applicants.component.css']
})
export class AllApplicantsComponent implements OnInit {

  all_ExamApplicants: ExamApplicant[];
  all_InterviewApplicants: InterviewApplicant[];
  errorMessage: string;
  examApplicants: boolean;
  private selectedApplicant = {};

  @ViewChild(ViewApplicantComponent)
  private viewQ: ViewApplicantComponent;

  @ViewChild(ViewInterviewComponent)
  private viewInt: ViewInterviewComponent;

  @ViewChild(ViewExamComponent)
  private viewExe: ViewExamComponent;

  constructor(protected ReceptService: receptService, protected router: Router , protected sharedApplicantService : SharedApplicantService) { }

  ngOnInit() {
    this.examApplicants = true;
    this.ReceptService.getAllExamApplicants().subscribe(
      response => {
        console.log(response);
        this.all_ExamApplicants = response
      },
      error => this.errorMessage = <any>error);

    this.ReceptService.getAllInterviewApplicants().subscribe(
      response => {
        console.log(response);
        this.all_InterviewApplicants = response
      },
      error => this.errorMessage = <any>error);

  }

  viewExamApplicant(applicant : ExamApplicant){
    console.log(applicant);
    this.sharedApplicantService.setSelectedExamApplicant(applicant);
    this.viewQ.setData();
  }

  viewInterviewApplicant(applicant : InterviewApplicant){
    console.log(applicant);
    this.sharedApplicantService.setSelectedInterviewApplicant(applicant);
    this.viewQ.setData();
  }

  viewInterview(applicant : InterviewApplicant){
    this.sharedApplicantService.setSelectedInterviewApplicant(applicant);
    this.viewInt.setData();
  }

  viewExam(applicant : ExamApplicant){
    this.sharedApplicantService.setSelectedExamApplicant(applicant);
    this.viewExe.setData();
  }

  setExamApplicants(){
    this.examApplicants = true;
  }

  examApplicantsExit(){
    this.examApplicants = false;
  }
}
