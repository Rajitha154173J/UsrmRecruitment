import { InterviewService } from './../../service/interview.service';
import { DataServiceService } from './../../service/data-service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  interviewForm: FormGroup;
  dropdownList = [];
  Panel = [];
  dropdownSettings = {};
  types;
  applicantDetail;
  constructor(private fBuilder: FormBuilder, private data: DataServiceService, private interviewService: InterviewService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe((res: any) => {
      this.applicantDetail = res;
    });

    this.interviewForm = this.fBuilder.group({
      InterviewName: [''],
      Panel: [''],
      ApplicantId: [''],
      TypeId: [''],
      InterviewDate: [''],
      ProcessId: [''],
      IsDelete: [''],
      FromTime: [''],
      ToTime: ['']
    });
    this.interviewService.getAllEmployee().subscribe((res: any) => {

      this.dropdownList = res;
    });
    this.interviewService.getInterviewType().subscribe((res: any) =>
      this.types = res);

  this.dropdownSettings = {
      singleSelection: false,
      idField: 'EmpId',
      textField: 'FullName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false
    };
  }
  onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }
  SubmitForm() {
    this.interviewForm.controls['ApplicantId'].setValue(this.applicantDetail.ApplicantId);
    this.interviewForm.controls['ProcessId'].setValue(this.applicantDetail.ProcessID);
     // console.log(this.interviewForm.value);
    console.log(this.interviewForm.value['Panel']);
   this.interviewService.addInterview(this.interviewForm.value).subscribe((res: any) => console.log(res));

  }
}
