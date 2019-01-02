import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApplicantProgressService {

  constructor(private http : HttpClient) { }

  baseURL="http://localhost:50727/api/RecruitmentApplicant/";

  getApplicantProgress(applicantId){
    let params = new HttpParams().set("applicantId",applicantId);
    return this.http.get(this.baseURL+"getApplicantStatus",{params:params});
  }
}
