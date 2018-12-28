import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { RecInterviewService } from '../../services/recInterview.service';
import { InterviewMarkSheet } from '../../Entities/InterviewMarkSheet';
import { InterviewMarkScore } from '../../Entities/InterviewMarkScore';
import { SharedQuestionService } from '../../services/shared-Question.service';
import { QuestionService } from '../../services/question.service';
import { Subject } from '../../Entities/Subject';

@Component({
  selector: 'app-mark-interview',
  templateUrl: './mark-interview.component.html',
//  styleUrls: ['./mark-interview.component.css']
})
export class MarkInterviewComponent implements OnInit {

  public sendingMarkSheet = {};
  public all_subjects: Subject[];
  public indexForSubject;

  constructor(protected recInterviewService: RecInterviewService,
    protected questionService: QuestionService,
    private formBuilder: FormBuilder,
    protected router: Router) { }

  private addForm: FormGroup;
  private markScore: FormArray;


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      MarkId: [''],
      IntervieweeId: [''],
      InterviewerId: [''],
      InterviewId: [''],
      Comments: [''],
      markScore: this.formBuilder.array([])
    });

    this.indexForSubject = -1;

    this.questionService.getSubjects().subscribe(
      response => {
        this.all_subjects = response;
        for (let i = 0; i < this.all_subjects.length; i++) {
          this.addNext();
        }
      },
      error => <any>error);


  }

  createMarkScore(): FormGroup {
    this.indexForSubject++;
    if (this.indexForSubject >= 0) {
      return this.formBuilder.group({
        SubjectName: this.all_subjects[this.indexForSubject].SubjectName,
        Score: [''],
        SubjectComments: ['']
      });
    }
  }

  addNext() {
    (this.addForm.controls['markScore'] as FormArray).push(this.createMarkScore())
  }

  onSubmit() {
    console.log(this.addForm.value);

    this.recInterviewService.postMarkSheet(this.addForm.value).subscribe(
      response => {
        console.log(response);
      },
      error => console.log(error)
    );
  }
}
