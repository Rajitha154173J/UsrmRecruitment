import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  baseURL="http://localhost:50727/api/RecruitmentProcess/";

  constructor(private http : HttpClient) { }

  getAllProcess(){
    return this.http.get(this.baseURL+"GetAllProcesses");
  }

}
