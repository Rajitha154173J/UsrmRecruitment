import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  baseURL="http://localhost:50727/api/RecruitmentApplicant/";
  constructor(private http : HttpClient) { }

  getAllApplicantByProcessId(id,examId){
    let params = new HttpParams().set("processId",id).set("examId",examId);
    return this.http.get(this.baseURL+"GetApplicantsByProcess",{params:params});
    //console.log(id);
  }

  getEnrollApplicant(examId){
    let params = new HttpParams().set("examId",examId);
    return this.http.get(this.baseURL+"getEnrollApplicant",{params:params})
  }

  getApplicantByEmail(email){
    let params = new HttpParams().set("email",email);
    return this.http.get(this.baseURL+"getApplicantByEmail",{params:params})
  }

  
}
