import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { ExamApplicant } from '../Entities/ExamApplicant';
import { InterviewApplicant } from '../Entities/InterviewApplicant';
import { Designation } from "src/app/entities/Designation";
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class receptService {

  private receptURLBase = 'http://localhost:50727/api/Reception/';
  private getAllExamApplicantURL = this.receptURLBase+'GetAllExamApplicants';  // URL to web API
  private getAllInterviewApplicantURL = this.receptURLBase+'GetAllInterviews';
  
  private loggedUserDesignation:any;

  constructor (private http: Http,
              private _HttpClient: HttpClient) {}

//response calling function by observer
   private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
//error calling function by observer
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    console.log(error);
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

  public getAllExamApplicants (): Observable<ExamApplicant[]> {
    console.log("in the sevice getQuestions() function");
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('withCredentials','false');
    let options = new RequestOptions({ headers: headers, withCredentials: false });

    // return this.http.get(this.getAllQuestionsURL,options)
    //                 .map(this.extractData)
    //                 .catch(this.handleError);

    return this.http.get(this.getAllExamApplicantURL,{ withCredentials: false})
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  public getAllInterviewApplicants (): Observable<InterviewApplicant[]> {
    console.log("in the sevice getQuestions() function");
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('withCredentials','false');
    let options = new RequestOptions({ headers: headers, withCredentials: false });

    // return this.http.get(this.getAllQuestionsURL,options)
    //                 .map(this.extractData)
    //                 .catch(this.handleError);

    return this.http.get(this.getAllInterviewApplicantURL,{ withCredentials: false})
                    .map(this.extractData)
                    .catch(this.handleError);
  }
}
