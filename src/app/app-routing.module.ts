import { RecApplicantComponent } from './Recruitment/component/rec-applicant/rec-applicant.component';
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
import { RecProcessComponent } from './Recruitment/component/rec-process/rec-process.component';
import { ApplicantComponent } from './Recruitment/component/applicant/applicant.component';
import { EditApplicantComponent } from './Recruitment/component/edit-applicant/edit-applicant.component';
import { ProcessComponent } from './Recruitment/component/process/process.component';
import { EditProcessComponent } from './Recruitment/component/edit-process/edit-process.component';
import { ProcessViewComponent } from './Recruitment/component/process-view/process-view.component';
import { InterviewComponent } from './Recruitment/component/interview/interview.component';

const routes: Routes = [
  {
    path: 'add-questions', component: AddQuestionComponent,
  },
  {
    path: 'edit-questions', component: EditQuestionsComponent,
  },
  {
    path: 'all-questions', component: AllQuestionsComponent,
  },
  {
    path: 'view-questions', component: ViewQuestionsComponent,
  },
  {
    path: 'recept-applicants', component: AllApplicantsComponent,
  },
  {
    path: 'mark-interview', component: MarkInterviewComponent,
  },
  {
    path: 'my-interview', component: MyInterviewsComponent,
  },
  {
    path: 'editExam/:id', component: ExamHomeComponent,
    children: [{ path: '', component: EditeExamComponent }]
  },
  {
    path: 'deleteExam/:id', component: ExamHomeComponent,
    children: [{ path: '', component: DeleteExamComponent }]
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'allExam', component: ExamHomeComponent,
    children: [{ path: '', component: AllExamComponent }]
  },
  {
    path: 'allExamEvent', component: ExamHomeComponent,
    children: [{ path: '', component: AllExamEventComponent }]
  },
  {
    path: 'addExam', component: ExamHomeComponent,
    children: [{ path: '', component: AddExamComponent }]
  },
  {
    path: 'examDetail/:id', component: ExamHomeComponent,
    children: [{ path: '', component: ExamDetailComponent }]
  },
  {
    path: 'examEvent/:id', component: ExamHomeComponent,
    children: [{ path: '', component: ViewExamEventComponent }]
  },
  {
    path: 'evaluate', component: ExamHomeComponent,
    children: [{ path: '', component: EvaluateExamComponent }]
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'startExam/:id', component: ExaStartPageComponent
  },
  {
    path: 'mExam', component: McqExamComponent
  },
  {
    path: 'eExam', component: EssayExamComponent
  },
  {
    path: 'error', component: ErrorComponent
  },
  {
    path: 'result', component: ExamHomeComponent,
    children: [{ path: '', component: ExamSubmitPageComponent }]
  },
  {
    path: 'employeeExam', component: ExamHomeComponent,
    children: [{ path: '', component: EmployeeExamComponent }]
  },
  {
    path: 'rec-applicant', component: RecApplicantComponent
  },
  {
    path: 'recruit-process', component: RecProcessComponent
  },
  {
    path: 'applicant', component: ApplicantComponent
  },
  {
    path: 'edit-applicant/:id', component: EditApplicantComponent
  },
  {
    path: 'process', component: ProcessComponent
  },
  {
    path: 'edit-process/:id', component: EditProcessComponent
  },
  {
    path: 'view-process', component: ProcessViewComponent
  },
  {
    path: 'add-interview', component: InterviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
