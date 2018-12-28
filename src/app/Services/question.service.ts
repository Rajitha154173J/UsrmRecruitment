import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { QuestionDTO } from '../Entities/QuestionDTO';
import { Designation } from "src/app/entities/Designation";
import { Subject } from "src/app/entities/Subject";
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class QuestionService {

  private questionURLBase = 'http://localhost:50727/api/Question/';
  private getAllQuestionsURL = this.questionURLBase+'GetAllQuestions';  // URL to web API
  private getQuestionByIdURL = this.questionURLBase+'GetQuestionById';
  private addQuestionURL = this.questionURLBase+'AddQuestion';
  private  updateQuestionURL =this.questionURLBase+'UpdateQuestion';
  private  deleteQuestionURL =this.questionURLBase+'DeleteQuestion';
  private  getByIDURL =this.questionURLBase+'GetById';
  private  getByQuestionTypeURL =this.questionURLBase+'GetByQuestionType';
  private getByQuestionTextURL = this.questionURLBase+ 'CheckSimilarity';
  private getAllDesignationsURL = this.questionURLBase+ 'GetAllDesignations';
  private getLoggedUserDesignationURL = this.questionURLBase+ 'GetResourceCode';
  private  approveQuestionURL =this.questionURLBase+'ApproveQuestion';
  private getAllSubjectsURL = this.questionURLBase+'GetAllSubjects'
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

  public getQuestions (): Observable<QuestionDTO[]> {
    console.log("in the sevice getQuestions() function");
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('withCredentials','false');
    let options = new RequestOptions({ headers: headers, withCredentials: false });

    // return this.http.get(this.getAllQuestionsURL,options)
    //                 .map(this.extractData)
    //                 .catch(this.handleError);

    return this.http.get(this.getAllQuestionsURL,{ withCredentials: false})
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  public getQuestionById (id:any): Observable<QuestionDTO> {
    console.log("in the sevice getQuestionById() function",id);
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('withCredentials','false');
    let options = new RequestOptions({ headers: headers, withCredentials: false });

    // return this.http.get(this.getAllQuestionsURL,options)
    //                 .map(this.extractData)
    //                 .catch(this.handleError);
    let params = new HttpParams().set('id', id);
    
    return this._HttpClient.get<QuestionDTO>(`${this.getQuestionByIdURL}`, { params: params });
                    
  }


  public getDesignations (): Observable<Designation[]> {
    console.log("in the sevice getDesignations() function");
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('withCredentials','false');
    let options = new RequestOptions({ headers: headers, withCredentials: false });

    return this.http.get(this.getAllDesignationsURL,{ withCredentials: false})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public getSubjects (): Observable<Subject[]> {
    console.log("in the sevice getDesignations() function");
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('withCredentials','false');
    let options = new RequestOptions({ headers: headers, withCredentials: false });

    return this.http.get(this.getAllSubjectsURL,{ withCredentials: false})
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  public postQuestion(question:QuestionDTO):Observable<QuestionDTO[]>{
    console.log(question);
    //NEED TO DEFINE THE HEADERS FOR THE TYPE OF DATA THAT WE NEED TO SEND
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    // return this.http.post(this.addQuestionURL,  question,options)
    //                 .map(this.extractData)
    //                 .catch(this.handleError);

    return this.http.post(this.addQuestionURL,  question,{ withCredentials: false})
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  public checkQuestionBeforeSubmit(text:any): Observable<QuestionDTO[]> {
    
    //NEED TO DEFINE THE HEADERS FOR THE TYPE OF DATA THAT WE NEED TO SEND
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let params = new HttpParams().set('s1', text);
    
    return this._HttpClient.get<QuestionDTO[]>(`${this.getByQuestionTextURL}`, { params: params });

    // return this.http.post(this.getByQuestionTextURL, question,{withCredentials:false})
    //                 .map(this.extractData)
    //                 .catch(this.handleError);
  }

  public deleteQuestion(question:QuestionDTO):Observable<number>{
    return this.http.post(this.deleteQuestionURL,question,{withCredentials:false})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public updateQuestion(question:QuestionDTO):Observable<QuestionDTO>{
    //NEED TO DEFINE THE HEADERS FOR THE TYPE OF DATA THAT WE NEED TO SEND
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.updateQuestionURL,  question,{withCredentials:false})
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  public getUserDesignation (): Observable<number> {
       
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('withCredentials','false');
    let options = new RequestOptions({ headers: headers, withCredentials: false });

    // return this.http.get(this.getAllQuestionsURL,options)
    //                 .map(this.extractData)
    //                 .catch(this.handleError);

    return this.http.get(this.getLoggedUserDesignationURL,{ withCredentials: false})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public approveQuestion(question:QuestionDTO):Observable<QuestionDTO>{
    //NEED TO DEFINE THE HEADERS FOR THE TYPE OF DATA THAT WE NEED TO SEND
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.approveQuestionURL,  question,{withCredentials:false})
                    .map(this.extractData)
                    .catch(this.handleError);
  }
}
