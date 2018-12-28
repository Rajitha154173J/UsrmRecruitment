import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';

import {ExamService} from '../../Service/exam.service'
import { Exam } from '../../Models/Exam';
import { Question } from '../../Models/Question';
import { Answer } from '../../Models/Answer';

@Component({
  selector: 'app-employee-exam',
  templateUrl: './employee-exam.component.html',
  styleUrls: ['./employee-exam.component.css']
})
export class EmployeeExamComponent implements OnInit {

  constructor(private examService:ExamService,
              private formBuilder: FormBuilder,
              private router:Router) { }

  isStart:boolean=false;
  private examForm : FormGroup;
  private answerForm:FormGroup;
  exam:Exam;
  questions:Question[];
  currentQuestin:Question;
  answers:Answer[];
  currentAnswer={};
  numberOfQz:number;
  index:number;

  //////////////////
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  ////////////////////

  ngOnInit() {
    this.examForm=this.formBuilder.group({
      NoOfQuestions:[''],
      LevelId:['']
    })

    this.answerForm  = this.formBuilder.group({
      Mcq:['']
    });

    this.answers=[];
    this.currentAnswer=null;
  }

  getQuestions(){
    this.exam = new Exam();
    this.exam.LevelId=this.examForm.value.LevelId;
    this.exam.NoOfQuestions=this.examForm.value.NoOfQuestions;
    this.examService.getEmployeeExamQuestion(this.exam).subscribe((data:Question[])=>{
      this.questions=data;
      this.currentQuestin=this.questions[0];
      this.numberOfQz=this.questions.length;
      this.index=0;
      this.loadQuize();
      this.isStart=true;
      console.log(this.currentQuestin);
    })
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
    this.next();
    this.currentQuestin=null;
    this.examService.submitEmployeeAnswear(this.answers).subscribe((data:any)=>{
      console.log(data);
      //this.score=data;
      //this.mode=true;
    })
    this.router.navigate(['/result']);
  }

  loadQuize(){
    this.startTime = new Date();
    this.timer = setInterval(() => { this.tick(); }, 1000);
    this.duration = this.parseTime(this.numberOfQz*2*60);
  }


  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.numberOfQz*2*60) {
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
