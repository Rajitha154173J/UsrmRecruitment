import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit, Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { QuestionDTO } from '../../Entities/QuestionDTO';
import { SharedQuestionService } from '../../services/shared-Question.service';
import { ViewChild } from "@angular/core";
import { ViewQuestionsComponent } from "../view-questions/view-questions.component";
import * as $ from 'jquery';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css']
})
export class AllQuestionsComponent implements OnInit {

  constructor(protected questionService: QuestionService, protected router: Router, protected sharedQuestionService: SharedQuestionService,
  ) { }

  errorMessage: string;
  all_Question: QuestionDTO[];
  postedQuestion: QuestionDTO[];
  testingVal = 'this is testing';
  pendingQuestion: boolean;
  QuestionById: QuestionDTO;
  loggedUserDesignation: number;
  public similarQuestions: QuestionDTO[];

  @ViewChild(ViewQuestionsComponent)
  private viewQ: ViewQuestionsComponent;

  ngOnInit(): void {
    this.pendingQuestion = false;
    console.log("all questions");

    this.questionService.getUserDesignation().subscribe(
      response => {
        this.loggedUserDesignation = response;
        console.log(this.loggedUserDesignation);
      },
      error => this.errorMessage = <any>error);


    this.questionService.getQuestions().subscribe(
      response => {
        this.all_Question = response;
      },
      error => this.errorMessage = <any>error);

  }

  getAllQuestions(): void {

    this.questionService.getQuestions().subscribe(
      response => {
        console.log(response);
        this.all_Question = response
      },

      error => this.errorMessage = <any>error);

  }

  postQuestion(): void {
    //let  tempQuestion:SendingQuestion = this.allQuestions[2];
    let tempQuestion: QuestionDTO = this.all_Question[0];

    this.questionService.postQuestion(tempQuestion).subscribe(
      response => {
        console.log(response);
        this.postedQuestion = response
      }
    )
  }

  approveQuestionConfirmed(question: QuestionDTO) {
    this.questionService.getQuestionById(question.QuestionId).subscribe(
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


  addNewQuestion(): void {
    this.router.navigate(['/add-questions'])
  }

  viewQuestion(question: QuestionDTO): void {
    this.sharedQuestionService.setSelectedQuestion(question);
    this.viewQ.setData();
    this.viewQ.showModal();
  }

  approveQuestion(question: QuestionDTO): void {
    this.sharedQuestionService.setSelectedQuestion(question);
    //this.viewQ.getSimilarQuestions();
     this.viewQ.setData();
    // this.viewQ.showModal();
  }

  editQuestion(question: QuestionDTO): void {
    this.questionService.getQuestionById(question.QuestionId).subscribe(
      response => {
        console.log(response);
        this.QuestionById = response;
        console.log("inside of edit question", this.QuestionById);
        this.sharedQuestionService.setSelectedQuestion(this.QuestionById);
        this.router.navigate(['/edit-questions']);
      },
      error => this.errorMessage = <any>error);
  }

  deleteQuestion(question: QuestionDTO): void {
    console.log('checking...');
    this.questionService.deleteQuestion(question).subscribe(
      response => {
        console.log("this is the return val of the deletion :" + response);
        if (response == 1) {
          for (var index = 0; index < this.all_Question.length; index++) {
            if (this.all_Question[index].QuestionId == question.QuestionId) {
              this.all_Question.splice(index, 1);
            }

          }
        }
      }
    );

  }

  pendingQuestions(): void {
    this.pendingQuestion = true;
  }

  pendingExit(): void {
    this.pendingQuestion = false;
  }

}