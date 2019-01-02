import { Component, OnInit } from '@angular/core';
import { receptService } from '../../Services/recept.service';
import { ExamApplicant } from '../../Entities/ExamApplicant';
import { InterviewApplicant } from '../../Entities/InterviewApplicant';
import { SharedApplicantService } from '../../services/shared-applicant.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-exam',
  templateUrl: './view-exam.component.html',
  //styleUrls: ['./view-exam.component.css']
})
export class ViewExamComponent implements OnInit {

  private selectedApplicant = {};
  private IsExamApplicant: boolean;

  errorMessage: string;

  constructor(protected ReceptService: receptService, protected router: Router, protected sharedApplicantService: SharedApplicantService) { }
  
  ngOnInit() {
  }

  show: boolean = false;

  setData(): void {
    if (this.sharedApplicantService.getApplicantType()) {
      this.selectedApplicant = this.sharedApplicantService.getSelectedExamApplicant();
    } else {
      this.selectedApplicant = this.sharedApplicantService.getSelectedInterviewApplicant();
    }
    console.log(this.selectedApplicant);
  }
}