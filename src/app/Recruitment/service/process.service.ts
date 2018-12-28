import { ProcessDetail } from './../../Models/processDatail';
import { Process } from './../../Models/Process';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(private http: HttpClient) { }

  getAllDestination() {
    return this.http.get('http://localhost:50727/api/RecruitmentProcess/GetAllDestination')
      .pipe(map((result: any) => result));
  }

  addProcess(data) {
    console.log(data);
    return this.http.post('http://localhost:50727/api/RecruitmentProcess/AddNewProcess', data, httpOptions)
      .pipe(map((result: any) => result));
  }

  getProcessById(id) {
    console.log(id);
    return this.http.post('http://localhost:50727/api/RecruitmentProcess/GetProcessById/' + id, httpOptions)
      .pipe(map((result: Process) => result));
  }

  getAllProccess() {
    return this.http.get('http://localhost:50727/api/RecruitmentProcess/GetAllProcesses')
      .pipe(map((result: any) => result));

  }

  getAllProcessDetail() {
    return this.http.get('http://localhost:50727/api/RecruitmentProcess/GetProcessDetail')
      .pipe(map((result: ProcessDetail[]) => result));
  }

  update(data) {
    return this.http.post('http://localhost:50727/api/RecruitmentProcess/UpdateProcess', data, httpOptions)
      .pipe(map((result: any) => result));
  }

  delete(data) {
    return this.http.post('http://localhost:50727/api/RecruitmentProcess/DetectProcess', data, httpOptions)
      .pipe(map((result: boolean) => result));
  }

  getProcessDesignations(id) {
    return this.http.post('http://localhost:50727/api/RecruitmentProcess/GetDesignationsByProcessId', id, httpOptions)
      .pipe(map((result: any) => result));
  }

  public uploadFile(fileToUpload: File) {
    const _formData = new FormData();
    _formData.append('file', fileToUpload, fileToUpload.name);
   // return<any>post(UrlFileUpload, _formData);
   return this.http.post(' http://localhost:50727/api/RecruitmentApplicant/UploadFile',  _formData)
   .map((res: any) => res);
  }

}
