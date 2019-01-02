import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseURL="http://localhost:50727/api/Employee/";
  homeURL="http://localhost:50727/api/home/"
  constructor(private http : HttpClient) { }

  getAllEmployee(examId){
    let params = new HttpParams().set("examId",examId);
    return this.http.get(this.baseURL+"getAllEmployee",{params:params});
  }

  getGetResourceCode(){
    return this.http.get(this.homeURL+"GetResourceCode");
  }

  checkIsAdmin(){
    return this.http.get(this.baseURL+"checkIsAdmin");
  }
}
