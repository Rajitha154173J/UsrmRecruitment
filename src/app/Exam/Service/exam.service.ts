import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ExamSupervisor } from '../Models/ExamSupervisor';
import { ExamApplicant } from '../Models/ExamApplicant';



@Injectable({
  providedIn: 'root'
})
export class ExamService {

  baseURL = 'http://localhost:50727/api/exam/';
  constructor(private http: HttpClient) { }

  getAllExam() {
    return this.http.get(this.baseURL + 'getAllExam');
  }

  getExamById(id) {
    const params = new HttpParams().set('examId', id)
    return this.http.get(this.baseURL + 'getExamById', { params: params });
  }

  registerExam(data) {
    return this.http.post(this.baseURL + 'createExam', data);
  }

  editExam(data) {
    return this.http.post(this.baseURL + 'editExam', data);
  }

  enroll(appId, examId) {
    const body: ExamApplicant = {
      ExamId: examId,
      ApplicantId: appId
    };
    return this.http.post(this.baseURL + 'enrollApplicant', body);
  }

  unEnroll(appId) {
    const params = new HttpParams().set('applicantId', appId);
    return this.http.get(this.baseURL + 'unEnrollApplicant', { params: params });
  }

  addSupervisor(resoruceCode, examId) {
    const body: ExamSupervisor = {
      ExamId: examId,
      ResourceCode: resoruceCode,
      SupervisorId: null,
      EmployeeName: null
    };
    return this.http.post(this.baseURL + 'addSupervisor', body);
  }

  getSupervisorPanel(examId) {
    const params = new HttpParams().set('examId', examId);
    return this.http.get(this.baseURL + 'getSupervisorPanel', { params: params });
  }

  removeSupervisor(suervisorId) {
    const params = new HttpParams().set('supervisorId', suervisorId);
    return this.http.get(this.baseURL + 'removeSupervisor', { params: params });
  }


  getAllQuestions(examId, applicantId) {
    const params = new HttpParams().set('examId', examId).set('applicantId', applicantId);
    return this.http.get(this.baseURL + 'getQuestions', { params: params });
  }

  submitAnswear(data, examId, applicantId) {
    const params = new HttpParams().set('examId', examId).set('applicantId', applicantId);
    return this.http.post(this.baseURL + 'submitAnswear', data, { params: params });
  }

  getExamForMark() {
    return this.http.get(this.baseURL + 'getExamForMark');
  }

  getExamEvent(examId) {
    const params = new HttpParams().set('examId', examId);
    return this.http.get(this.baseURL + 'getExamEvent', { params: params });
  }

  getAnswersForMark(examId, applicantId) {
    const params = new HttpParams().set('examId', examId).set('applicantId', applicantId);
    return this.http.get(this.baseURL + 'getAnswersForMark', { params: params });
  }

  getExamsByApplicantId(id) {
    const params = new HttpParams().set('id', id);
    return this.http.get(this.baseURL + 'GetExamsByApplicantId', { params: params });
  }

  addResult(data) {
    return this.http.post(this.baseURL + 'addResult', data);
  }

  deconsteExam(examId) {
    const params = new HttpParams().set('examId', examId);
    return this.http.get(this.baseURL + 'deconsteExam', { params: params });
  }

  getEmployeeExamQuestion(data) {
    return this.http.post(this.baseURL + 'getEmployeeExamQuestion', data);
  }

  submitEmployeeAnswear(data) {
    return this.http.post(this.baseURL + 'submitAnswear', data);
  }

  getCurrentAvg() {
    return this.http.get(this.baseURL + 'getCurrentAvg');
  }

  getTopTen() {
    return this.http.get(this.baseURL + 'getTopTen');
  }
  deleteExam(examId) {
    const params = new HttpParams().set('examId', examId);
    return this.http.get(this.baseURL + 'deleteExam', { params: params });
  }

}
