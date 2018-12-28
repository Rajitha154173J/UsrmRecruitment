import { DataServiceService } from './../../service/data-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessDetail } from '../../../Models/processDatail';
import { Applicant } from '../../../Models/Applicant';

@Component({
  selector: 'app-process-view',
  templateUrl: './process-view.component.html',
  styleUrls: ['./process-view.component.css']
})
export class ProcessViewComponent implements OnInit {
  message: ProcessDetail[];
  detail: any;
  applicantsList: any;
  applicants: any;
  constructor(private router: ActivatedRoute, private data: DataServiceService, private route: Router) { }


  ngOnInit() {
    this.data.currentMessage.subscribe((mes: ProcessDetail[]) => {
      this.message = mes;
      this.applicantsList = this.message;
      this.applicants = this.applicantsList.RecruitmentApplicantDetailContact;
      // console.log(this.applicants)
    });


  }
  setvalue(process) {
    // console.log(process);
    // this.data.currentMessage.subscribe(message => this.message = message);
    this.data.changeMessage(process);
    this.route.navigate(['/add-interview']);

  }
}


