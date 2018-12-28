import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

import { QuestionService } from '../../services/question.service';
import { QuestionDTO } from '../../Entities/QuestionDTO';
import { Designation } from '../../entities/Designation';
import { SharedQuestionService } from '../../services/shared-Question.service';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.css']
})
export class EditQuestionsComponent implements OnInit {

  public sendingQuestion : QuestionDTO;
  public sendingQuestionMCQ = {};
  public sendingQuestioneESSAY = {};
  public submittedMCQ = false;
  public submittedEssay = false;
  public similarQuestions:QuestionDTO[];
  public tempMCQAnsewerArray:number[];
  public foundSimilar = false;
  public questionID: any;
  public allDesignations : Designation[];


  constructor(protected questionService: QuestionService,
    private formBuilder: FormBuilder,
    protected router: Router,
    protected sharedQuestionService:SharedQuestionService) { }

  private addForm: FormGroup;

  ngOnInit() {

    this.sendingQuestion = this.sharedQuestionService.getSelectedQuestion();
    if(!this.sendingQuestion){
      this.router.navigate(['all-questions']);
    }else{
      this.similarQuestions = null;
      this.tempMCQAnsewerArray = [];
      console.log(this.sendingQuestion);
      this.questionID = this.sendingQuestion.QuestionId;
      this.questionService.getDesignations().subscribe(
        response => {
          console.log(response);
          this.allDesignations = response;
        },
        error => <any>error); 
    
    }
    this.addForm = this.formBuilder.group({
      TypeId: [this.sendingQuestion.TypeId],
      LevelId: [this.sendingQuestion.LevelId],
      QuestionText: [this.sendingQuestion.QuestionText],
      SudegstionOne: [this.sendingQuestion.SudegstionOne],
      SudegstionTwo: [this.sendingQuestion.SudegstionTwo],
      SudegstionThree: [this.sendingQuestion.SudegstionThree],
      SudegstionFour: [this.sendingQuestion.SudegstionFour],
      SubjectId: [this.sendingQuestion.SubjectId],
      DesignationId: [this.sendingQuestion.DesignationId],
      SampleAnwser: [this.sendingQuestion.SampleAnwser],
    });

    console.log(this.addForm.value);
   
  }

  onSubmit() {
    if (this.addForm.value.TypeId == 1) {
      this.sendingQuestionMCQ['QuestionId'] = this.sendingQuestion.QuestionId;
      this.sendingQuestionMCQ['TypeId'] = this.addForm.value.TypeId;
      this.sendingQuestionMCQ['LevelId'] = this.addForm.value.LevelId;
      this.sendingQuestionMCQ['CreatedBy'] = this.sendingQuestion.CreatedBy;
      this.sendingQuestionMCQ['CreatedDate'] = this.sendingQuestion.CreatedDate;
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
      this.sendingQuestioneESSAY['QuestionId'] = this.sendingQuestion.QuestionId;
      this.sendingQuestioneESSAY['TypeId'] = this.addForm.value.TypeId;
      this.sendingQuestioneESSAY['LevelId'] = this.addForm.value.LevelId;
      this.sendingQuestioneESSAY['CreatedBy'] = this.sendingQuestion.CreatedBy;
      this.sendingQuestioneESSAY['CreatedDate'] = this.sendingQuestion.CreatedDate;

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
    if(this.submittedMCQ){
      this.similarQuestions=null;
      console.log(this.sendingQuestionMCQ);
      
      this.questionService.updateQuestion(<QuestionDTO>this.sendingQuestionMCQ).subscribe(
        response => console.log(response),
        error => console.log(error)
      );
      this.router.navigate(['/all-questions']);
    }
    else{
      this.similarQuestions=null;
      console.log(this.sendingQuestioneESSAY);
      

      this.questionService.updateQuestion(<QuestionDTO>this.sendingQuestioneESSAY).subscribe(
        response => console.log(response),
        error => console.log(error)
      );

      this.router.navigate(['/all-questions']);
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
