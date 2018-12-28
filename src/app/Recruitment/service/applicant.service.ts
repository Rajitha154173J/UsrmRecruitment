import { ApplicantDetail } from './../../Models/ApplicantDetail';
import { Applicant } from './../../Models/Applicant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const httpOptionsFile = {
  headers: new HttpHeaders({
    'Accept': 'application/pdf',
    'Content-Type': 'multipart/form-data'

  })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private http: HttpClient) { }

  getCurrentUser() {

    return this.http.get('http://localhost:50727/api/Home/GetResourceCode')
      .pipe(map((res: any) => res));
  }



  addApplication(data) {
    // console.log(data);
    return this.http.post('http://localhost:50727/api/RecruitmentApplicant/AddNewApplicant', data, httpOptions)
      .pipe(map((result: any) => result));

  }

  getAllAApplicantDetail() {
    return this.http.get(' http://localhost:50727/api/RecruitmentApplicant/ApplicantDetail')
      .pipe(map((result: ApplicantDetail[]) => result));
  }

  getAllApplicant() {
    return this.http.get('http://localhost:50727/api/RecruitmentApplicant/GetAllApplicants')
      .pipe(map((result: Applicant[]) => result));
  }

  getApplicantById(id) {
    return this.http.post('http://localhost:50727/api/RecruitmentApplicant/GetApplicantById/' + id, httpOptions)
      .pipe(map((result: Applicant) => result));
  }

  updateApplicant(data) {
    return this.http.post('http://localhost:50727/api/RecruitmentApplicant/UpdateApplicant', data, httpOptions)
      .pipe(map((result: boolean) => result));
  }
  deleteApplicant(data) {
    return this.http.post(' http://localhost:50727/api/RecruitmentApplicant/DeleteApplicant', data, httpOptions)
      .pipe(map((result: any) => result));
  }

  cvUpload(data) {
    console.log(data);
    return this.http.post(' http://localhost:50727/api/RecruitmentApplicant/UploadFile', data, httpOptionsFile)
      .map((res: any) => res);
  }

  public uploadFile(fileToUpload: File) {
    const _formData = new FormData();
    _formData.append('file', fileToUpload, fileToUpload.name);
   // return<any>post(UrlFileUpload, _formData);
   return this.http.post(' http://localhost:50727/api/RecruitmentApplicant/UploadFile',  _formData)
   .map((res: any) => res);
  }

}
