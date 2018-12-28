import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HostListener } from '@angular/core';

import {ExamService} from '../../Service/exam.service'
import { Question } from '../../Models/Question';
import { Answer } from '../../Models/Answer';
import { Exam } from '../../Models/Exam';

@Component({
  selector: 'app-mcq-exam',
  templateUrl: './mcq-exam.component.html',
  styleUrls: ['./mcq-exam.component.css']
})
export class McqExamComponent implements OnInit {
  Math: any;
  constructor(private route: ActivatedRoute,
              private ExamService:ExamService,
              private formBuilder: FormBuilder) { 
                this.Math = Math;
              }

  private sub:any;
  examId:number;
  applicantId:number;
  private answerForm : FormGroup;
  questions:Question[];
  currentQuestin:Question;
  answers:Answer[];
  currentAnswer={};
  numberOfQz:number;
  index:number;
  exam:Exam;
  mode:boolean=false;
  score:any;
  loading:boolean=false;
  percentage:any;
  lineColor:any;

  //////////////////
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  ////////////////////

  ngOnInit() {
    this.sub=this.route.params.subscribe(params=>{
      this.examId=params['exam'];
      this.applicantId=params['applicant'];
      this.loadQuize();
    });

    this.answerForm  = this.formBuilder.group({
      Mcq:['']
    });

    this.ExamService.getAllQuestions(this.examId,this.applicantId).subscribe((data:Question[])=>{
      this.questions=data;
      this.currentQuestin=this.questions[0];
      this.numberOfQz=this.questions.length;
      this.index=0;
      console.log(this.currentQuestin);
    });

  

    //initialize variable
    this.answers=[];
    this.currentAnswer=null;
  }

  next(){
    if(this.index<this.numberOfQz){
      if(this.currentAnswer==null){
        this.currentAnswer={
          'AnswerId':0,
          'QuestionId':this.currentQuestin.QuestionId
        }
      }
      this.index++;
      this.currentQuestin=this.questions[this.index];
      this.answers.push(<Answer>this.currentAnswer);
      this.answerForm.setValue({
        Mcq:'0'
      })
      this.currentAnswer=null;
      console.log(this.answers);
    }
  }

  selectAnswer(){
    //this.a=this.answerForm.value.Mcq;
    this.currentAnswer={
      'AnswerId':this.answerForm.value.Mcq,
      'QuestionId':this.currentQuestin.QuestionId
    }
  }

  submit(){
    this.currentQuestin=null;
    this.loading=true;
    this.next();
    this.ExamService.submitAnswear(this.answers,this.examId,this.applicantId).subscribe((data:any)=>{
      console.log(data);
      this.score=data;
      this.percentage=this.Math.round(data/this.numberOfQz*100);
      if (75 <= this.percentage && this.percentage <= 100) {
        this.lineColor="#78c000";
      }
      else if (50 <= this.percentage && this.percentage <= 74) {
        this.lineColor="#61a9dc";
      }
      else if (25 <= this.percentage && this.percentage <= 49) {
        this.lineColor="#fdb900";
      }
      else if (0 <= this.percentage && this.percentage <= 24) {
        this.lineColor="#ff6347";
      }
      this.loading=false;
      this.mode=true;
    })
  }

  loadQuize(){
    this.ExamService.getExamById(this.examId).subscribe((data:Exam)=>{
      this.exam=data;
      this.startTime = new Date();
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(data.Duration*60);
    })
  }


  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.exam.Duration*60) {
      this.submit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.submit();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
          $event.returnValue =true;
  }

}
