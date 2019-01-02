import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DpDatePickerModule} from 'ng2-date-picker';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExamHomeComponent } from './Exam/Component/exam-home/exam-home.component';
import { AllExamComponent } from './Exam/Component/all-exam/all-exam.component';
import { EditeExamComponent } from './Exam/Component/edite-exam/edite-exam.component';
import { DeleteExamComponent } from './Exam/Component/delete-exam/delete-exam.component';
import { AddExamComponent } from './Exam/Component/add-exam/add-exam.component';
import { ExamDetailComponent } from './Exam/Component/exam-detail/exam-detail.component';
import { McqExamComponent } from './Exam/Component/mcq-exam/mcq-exam.component';
import { EssayExamComponent } from './Exam/Component/essay-exam/essay-exam.component';
import { AllExamEventComponent } from './Exam/Component/all-exam-event/all-exam-event.component';
import { ViewExamEventComponent } from './Exam/Component/view-exam-event/view-exam-event.component';
import { EvaluateExamComponent } from './Exam/Component/evaluate-exam/evaluate-exam.component';
import { ExaStartPageComponent } from './Exam/Component/exa-start-page/exa-start-page.component';
import { ExamSubmitPageComponent } from './Exam/Component/exam-submit-page/exam-submit-page.component';
import { ErrorComponent } from './error/error.component';
import { EmployeeExamComponent } from './Exam/Component/employee-exam/employee-exam.component';


import { AddQuestionComponent } from './Questions/add-question/add-question.component';
import { AllQuestionsComponent } from './Questions/all-questions/all-questions.component';
import { EditQuestionsComponent } from './Questions/edit-questions/edit-questions.component';
import { ViewQuestionsComponent } from './Questions/view-questions/view-questions.component';
import { QuestionService } from './services/question.service';
import { SharedQuestionService } from './services/shared-Question.service';
import { HomeComponent } from './Home/home.component';
import { AllApplicantsComponent } from './Reception/all-applicants/all-applicants.component';
import { receptService } from './Services/recept.service';
import { ViewApplicantComponent } from './Reception/view-applicant/view-applicant.component';
import { SharedApplicantService } from './services/shared-applicant.service';
import { ViewInterviewComponent } from './Reception/view-interview/view-interview.component';
import { ViewExamComponent } from './Reception/view-exam/view-exam.component';
import { MyInterviewsComponent } from './Interview/my-interviews/my-interviews.component';
import { MarkInterviewComponent } from './Interview/mark-interview/mark-interview.component';
import { RecInterviewService } from './services/recInterview.service';
import { ApplicantProgressComponent } from './Recruitment/component/applicant-progress/applicant-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    ExamHomeComponent,
    AllExamComponent,
    EditeExamComponent,
    DeleteExamComponent,
    AddExamComponent,
    ExamDetailComponent,
    McqExamComponent,
    EssayExamComponent,
    HomeComponent,
    AllExamEventComponent,
    ViewExamEventComponent,
    EvaluateExamComponent,
    ExaStartPageComponent,
    ExamSubmitPageComponent,
    ErrorComponent,
    EmployeeExamComponent,
    AddQuestionComponent,
    AllQuestionsComponent,
    EditQuestionsComponent,
    ViewQuestionsComponent,
    AllApplicantsComponent,
    ViewApplicantComponent,
    ViewInterviewComponent,
    ViewExamComponent,
    MyInterviewsComponent,
    MarkInterviewComponent,
    ApplicantProgressComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DpDatePickerModule,
    NgCircleProgressModule.forRoot(),
    AngularEditorModule
  ],
  providers:[ QuestionService, SharedQuestionService, receptService , SharedApplicantService, RecInterviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
