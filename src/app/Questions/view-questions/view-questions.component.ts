import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionService } from '../../services/question.service';
import { QuestionDTO } from '../../Entities/QuestionDTO';
import { SharedQuestionService } from '../../services/shared-Question.service';


@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  constructor(private sharedQuestionService: SharedQuestionService,protected questionService: QuestionService,
    protected router: Router) { }

  private selectedQuestion = {};
  QuestionById: QuestionDTO;
  errorMessage: string;
  public similarQuestions: QuestionDTO[];

  ngOnInit() {
  }

  show: boolean = false;
  
  setData(): void {
    this.selectedQuestion = this.sharedQuestionService.getSelectedQuestion();
    this.getSimilarQuestions();
  }

  showModal() {
    this.show;
  }

  getSimilarQuestions() {
    console.log("inside simmilar",this.selectedQuestion);
    //checking similar questions before approve question
    this.questionService.checkQuestionBeforeSubmit(this.selectedQuestion['QuestionText']).subscribe(
      response => {
        this.similarQuestions = response;
        console.log("got similar",response);
        this.showModal();
      },
      error => console.log(error)  
    );
  }
 

  editQuestion(): void {
    console.log(this.sharedQuestionService.getSelectedQuestion());
    this.questionService.getQuestionById(this.sharedQuestionService.getSelectedQuestion().QuestionId).subscribe(
      response => {
        console.log(response);
        this.QuestionById = response;
        console.log("inside of edit question",this.QuestionById);  
        this.sharedQuestionService.setSelectedQuestion(this.QuestionById);
        this.router.navigate(['/edit-questions']);
      },
      error => this.errorMessage = <any>error);
  }

  approveQuestionConfirmed(question: QuestionDTO) {
    this.questionService.getQuestionById(this.sharedQuestionService.getSelectedQuestion().QuestionId).subscribe(
      response => {
        this.QuestionById = response;
        
        this.questionService.approveQuestion(this.QuestionById).subscribe(
          response => this.router.navigate(['/all-questions']),
          error => console.log(error)
          
        );
      },
      error => this.errorMessage = <any>error);
    //this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/all-questions']);
  }
}
