import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

import { QuestionService } from '../../services/question.service';
import { QuestionDTO } from '../../Entities/QuestionDTO';
import { Designation } from '../../entities/Designation';
import { SharedQuestionService } from '../../services/shared-Question.service';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})

export class AddQuestionComponent implements OnInit {

  // public sendingQuestion: QuestionDTO;
  public sendingQuestionMCQ = {};
  public sendingQuestioneESSAY = {};
  public submittedMCQ = false;
  public submittedEssay = false;
  public similarQuestions: QuestionDTO[];
  public tempMCQAnsewerArray: number[];
  public foundSimilar = false;
  public allDesignations: Designation[];

  constructor(protected questionService: QuestionService,
    private formBuilder: FormBuilder,
    protected router: Router) { }

  private addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      TypeId: [''],
      LevelId: [''],
      QuestionText: [''],
      SudegstionOne: [''],
      SudegstionTwo: [''],
      SudegstionThree: [''],
      SudegstionFour: [''],
      SubjectId: [''],
      DesignationId: [''],
      SampleAnwser: [''],
    });

    console.log(this.addForm.value);

    // this.sendingQuestion = new QuestionDTO();
    this.similarQuestions = null;
    this.tempMCQAnsewerArray = [];
    this.questionService.getDesignations().subscribe(
      response => {
        this.allDesignations = response;
      },
      error => <any>error);

  }

  onSubmit() {
    if (this.addForm.value.TypeId == 1) {
      this.sendingQuestionMCQ['QuestionId'] = '';
      this.sendingQuestionMCQ['TypeId'] = this.addForm.value.TypeId;
      this.sendingQuestionMCQ['LevelId'] = this.addForm.value.LevelId;
      this.sendingQuestionMCQ['CreatedBy'] = '';
      this.sendingQuestionMCQ['CreatedDate'] = '';
      this.sendingQuestionMCQ['MCQAnswers'] = this.tempMCQAnsewerArray;
      this.sendingQuestionMCQ['QuestionText'] = this.addForm.value.QuestionText;
      this.sendingQuestionMCQ['SudegstionOne'] = this.addForm.value.SudegstionOne;
      this.sendingQuestionMCQ['SudegstionTwo'] = this.addForm.value.SudegstionTwo;
      this.sendingQuestionMCQ['SudegstionThree'] = this.addForm.value.SudegstionThree;
      this.sendingQuestionMCQ['SudegstionFour'] = this.addForm.value.SudegstionFour;
      this.sendingQuestionMCQ['SubjectId'] = this.addForm.value.SubjectId;
      this.sendingQuestionMCQ['DesignationId'] = this.addForm.value.DesignationId;
      this.submittedMCQ = true;
      this.submittedEssay = false;

    } else if (this.addForm.value.TypeId == 2) {
      this.sendingQuestioneESSAY['QuestionId'] = '';
      this.sendingQuestioneESSAY['TypeId'] = this.addForm.value.TypeId;
      this.sendingQuestioneESSAY['LevelId'] = this.addForm.value.LevelId;
      this.sendingQuestioneESSAY['CreatedBy'] = '';
      this.sendingQuestioneESSAY['CreatedDate'] = '';

      this.sendingQuestioneESSAY['QuestionText'] = this.addForm.value.QuestionText;
      this.sendingQuestioneESSAY['SampleAnwser'] = this.addForm.value.SampleAnwser;
      this.sendingQuestioneESSAY['SubjectId'] = this.addForm.value.SubjectId;
      this.sendingQuestioneESSAY['DesignationId'] = this.addForm.value.DesignationId;
      this.submittedEssay = true;
      this.submittedMCQ = false;
    }


    if (this.submittedMCQ) {
      this.questionService.checkQuestionBeforeSubmit(this.sendingQuestionMCQ['QuestionText']).subscribe(
        response => {
          this.similarQuestions = response;
        },
        error => console.log(error)

      );
    }
    else {
      this.questionService.checkQuestionBeforeSubmit(this.sendingQuestioneESSAY['QuestionText']).subscribe(
        response => {
          this.similarQuestions = response;
        },
        error => console.log(error)
      );
    }
    

  }

  public confirmAndSend() {
    if (this.submittedMCQ) {
      this.similarQuestions = null;
      this.questionService.postQuestion(<QuestionDTO>this.sendingQuestionMCQ).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/all-questions']);
        },
        error => console.log(error)

      );
    }
    else {
      this.similarQuestions = null;


      this.questionService.postQuestion(<QuestionDTO>this.sendingQuestioneESSAY).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['/all-questions']);
        },
        error => console.log(error)
      );
    }

  }

  public editQuestion() {
    this.submittedMCQ = this.submittedEssay = false;
    this.similarQuestions = null;
  }

  
  get diagnostic() { return JSON.stringify({ 'MCQ': this.sendingQuestionMCQ, 'Essay': this.sendingQuestioneESSAY }); }

  private log: string = '';

  //called once a check box for the answers is clicked
  private logCheckbox(element: HTMLInputElement): void {
    if (element.checked) {
      if (this.tempMCQAnsewerArray.length == 0) {
        this.tempMCQAnsewerArray.push(parseInt(element.value));
      }
      else {
        this.tempMCQAnsewerArray.forEach(item => {
          if (item == parseInt(element.value)) {
            this.foundSimilar = true;
          }
        });
        if (this.foundSimilar == false)
          this.tempMCQAnsewerArray.push(parseInt(element.value));
      }
    } else {
      for (var index = 0; index < this.tempMCQAnsewerArray.length; index++) {

        if (this.tempMCQAnsewerArray[index] == parseInt(element.value)) {
          this.tempMCQAnsewerArray.splice(index, 1);
        }
      }
    }

    console.log(this.tempMCQAnsewerArray);
    
  }
}
