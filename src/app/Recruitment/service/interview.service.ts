import { baseUrl } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class InterviewService {

  baseURLInt = baseUrl.local + '/RecruitmentInterviews';
  baseURLEmp = baseUrl.local + '/Employee';

  constructor(private http: HttpClient) { }

  addInterview(data) {
    return this.http.post(this.baseURLInt + '/setInterview', data, httpOptions).pipe(map((res: any) =>
      res));
  }

  getAllEmployee() {
    return this.http.get(this.baseURLEmp + '/GetAllEmployee').pipe(map((res: any) => res));
  }
  getInterviewType() {
    return this.http.get(this.baseURLInt + '/getInterviewType').pipe(map((res: any) => res));
  }
}
