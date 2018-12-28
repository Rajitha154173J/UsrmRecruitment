import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { InterviewMarkSheet } from '../Entities/InterviewMarkSheet';
import { InterviewMarkScore } from '../Entities/InterviewMarkScore';
import { Designation } from "src/app/entities/Designation";
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class RecInterviewService {

  private interviewURLBase = 'http://localhost:50727/api/Interview/';
  
  private addMarkSheetURL = this.interviewURLBase+'AddMarkSheet'; 
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

  public postMarkSheet(markSheet:any):Observable<InterviewMarkSheet>{
    console.log(markSheet);
    //NEED TO DEFINE THE HEADERS FOR THE TYPE OF DATA THAT WE NEED TO SEND
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.addMarkSheetURL,  markSheet,{ withCredentials: false})
                    .map(this.extractData)
                    .catch(this.handleError);
  }
}
