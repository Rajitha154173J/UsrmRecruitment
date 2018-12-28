import { ProcessService } from 'src/app/Recruitment/service/process.service';
import { ApplicantDetail } from './../../../Models/ApplicantDetail';
import { Applicant } from './../../../Models/Applicant';

import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/Recruitment/service/applicant.service';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {

  applicants: ApplicantDetail[];
  id: number;


  constructor(private applicantService: ApplicantService, private proceService: ProcessService) {

  }

  ngOnInit() {

    this.applicantService.getAllAApplicantDetail().subscribe((result: ApplicantDetail[]) => {

      this.applicants = result;
    });
  }
  delect(data) {


    this.applicantService.deleteApplicant(data).subscribe((result: any) => {
      location.reload();

    }
    );

  }
}
