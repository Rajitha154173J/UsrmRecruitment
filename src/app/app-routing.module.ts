import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditeExamComponent } from './Exam/Component/edite-exam/edite-exam.component';
import { DeleteExamComponent } from './Exam/Component/delete-exam/delete-exam.component';
import { AllExamComponent } from './Exam/Component/all-exam/all-exam.component';
import { ExamHomeComponent } from './Exam/Component/exam-home/exam-home.component';
import { AddExamComponent } from './Exam/Component/add-exam/add-exam.component';
import { ExamDetailComponent } from './Exam/Component/exam-detail/exam-detail.component';
import { ViewExamEventComponent } from './Exam/Component/view-exam-event/view-exam-event.component';
import { EvaluateExamComponent } from './Exam/Component/evaluate-exam/evaluate-exam.component';
import { HomeComponent } from './Home/home.component';
import { ExaStartPageComponent } from './Exam/Component/exa-start-page/exa-start-page.component';
import { ExamSubmitPageComponent } from './Exam/Component/exam-submit-page/exam-submit-page.component';
import { McqExamComponent } from './Exam/Component/mcq-exam/mcq-exam.component';
import { EssayExamComponent } from './Exam/Component/essay-exam/essay-exam.component';
import { AllExamEventComponent } from './Exam/Component/all-exam-event/all-exam-event.component';
import { ErrorComponent } from './error/error.component';
import { EmployeeExamComponent } from './Exam/Component/employee-exam/employee-exam.component';


import { AddQuestionComponent } from './Questions/add-question/add-question.component';
import { EditQuestionsComponent } from './Questions/edit-questions/edit-questions.component';
import { AllQuestionsComponent } from './Questions/all-questions/all-questions.component';
import { ViewQuestionsComponent } from './Questions/view-questions/view-questions.component';
import { AllApplicantsComponent } from './Reception/all-applicants/all-applicants.component';

import { MyInterviewsComponent } from './Interview/my-interviews/my-interviews.component';
import { MarkInterviewComponent } from './Interview/mark-interview/mark-interview.component';

import { ApplicantProgressComponent } from './Recruitment/component/applicant-progress/applicant-progress.component';

import { AuthGuard } from "src/app/auth.guard";
import { RoleGuard } from "src/app/role.guard";

const routes: Routes = [
  {
    path:'add-questions' ,component:AddQuestionComponent,canActivate: [AuthGuard]
  },
  {
    path:'edit-questions' ,component:EditQuestionsComponent,canActivate: [AuthGuard]
   },
  {
    path:'all-questions' ,component:AllQuestionsComponent,canActivate: [AuthGuard]
  },
  {
    path:'view-questions' ,component:ViewQuestionsComponent,canActivate: [AuthGuard]
  },
  {
    path:'recept-applicants' ,component:AllApplicantsComponent,canActivate: [AuthGuard]
  },
  {
    path:'mark-interview' ,component:MarkInterviewComponent,canActivate: [AuthGuard]
  },
  {
    path:'my-interview' ,component:MyInterviewsComponent,canActivate: [AuthGuard]
  },
  {
    path:'editExam/:id' ,component:ExamHomeComponent,
    children:[{path:'',component:EditeExamComponent}],canActivate: [AuthGuard]
  },
  {
    path:'deleteExam/:id' ,component:ExamHomeComponent,
    children:[{path:'',component:DeleteExamComponent}]
  },
  {
    path:'' ,redirectTo:'/home',pathMatch:'full'
  },
  {
    path:'allExam',component:ExamHomeComponent,
    children:[{path:'',component:AllExamComponent}],canActivate: [AuthGuard,RoleGuard]
  },
  {
    path:'allExamEvent',component:ExamHomeComponent,
    children:[{path:'',component:AllExamEventComponent}],canActivate: [AuthGuard]
  },
  {
    path:'addExam',component:ExamHomeComponent,
    children:[{path:'',component:AddExamComponent}],canActivate: [AuthGuard,RoleGuard]
  },
  {
    path:'examDetail/:id',component:ExamHomeComponent,
    children:[{path:'',component:ExamDetailComponent}],canActivate: [AuthGuard,RoleGuard]
  },
  {
    path:'examEvent/:id',component:ExamHomeComponent,
    children:[{path:'',component:ViewExamEventComponent}],canActivate: [AuthGuard]
  },
  {
    path:'evaluate',component:ExamHomeComponent,
    children:[{path:'',component:EvaluateExamComponent}],canActivate: [AuthGuard]
  },
  {path: 'home' , component: HomeComponent},
  {
    path:'startExam/:id',component:ExaStartPageComponent
  },
  {
    path:'mExam',component:McqExamComponent
  },
  {
    path:'eExam',component:EssayExamComponent
  },
  {
    path:'error',component:ErrorComponent
  },
  {
    path:'result',component:ExamHomeComponent,
    children:[{path:'',component:ExamSubmitPageComponent}],canActivate: [AuthGuard]
  },
  {
    path:'employeeExam',component:ExamHomeComponent,
    children:[{path:'',component:EmployeeExamComponent}],canActivate: [AuthGuard]
  },
  {
    path:'apllicant-progress',component:ApplicantProgressComponent,canActivate: [AuthGuard,RoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
