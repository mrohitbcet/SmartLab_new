import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import { Patient } from '../models/Patient.model';
import { GroupMaster } from '../models/GroupMaster';
import { Observable, throwError } from 'rxjs';
import { TestMaster } from '../models/TestMaster';
import { ReportData, Report, ReportDetails, AllReportsInfo,ReportInfo,ReportToEmail } from '../models/Report';
@Injectable({
  providedIn: 'root'
})
export class LabService {
  
baseUrl = 'http://bansaruli.in/api/Lab/' 
//baseUrl = 'http://localhost:5000/api/Lab/'
  constructor(private http: HttpClient) { }
  Patientregister(Patient:Patient)
  {
   const httpOptions={
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
  
     })
   };
   var body = JSON.stringify(Patient);
  return this.http.post(this.baseUrl+'Patientregister',body,httpOptions);
  
  }
  getDoctors(CID:number)
  {
    return this.http.get(this.baseUrl+"Doctors/"+CID);
  }
  getAllPatients(CID:number):Observable<Patient[]>{
  return this.http.get<Patient[]>(this.baseUrl+"patientinfo/"+CID);
  }
  SearchPatientbyName(name:string,CID:number):Observable<Patient[]>{
    return this.http.get<Patient[]>(this.baseUrl+"SearchPatientbyName/"+name+"/"+CID);
    }
GetPatientinfoById(Id:number):Observable<Patient>{
    return this.http.get<Patient>(this.baseUrl+"GetpatientinfobyID/"+Id);
  }
  UpdatePatientInfo(Patient:Patient)
  {
   const httpOptions={
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   };
  var body = JSON.stringify(Patient);
 return this.http.post(this.baseUrl+'UpdatePatientinfoById',body,httpOptions);
  
  }
  AddTestGroup(GroupMaster: GroupMaster)
  {
   const httpOptions={
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   };
  var body = JSON.stringify(GroupMaster);
 
  return this.http.post(this.baseUrl+'AddTestGroup',body,httpOptions);
  
  }
  
  getAllTestGroups():Observable<GroupMaster[]>{
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<GroupMaster[]>(this.baseUrl+"getAllTestGroups")
    
    }

    GetGroupinfoById(GroupId:number):Observable<GroupMaster>{
      return this.http.get<GroupMaster>(this.baseUrl+"GetGroupinfoById/"+GroupId);

    }

    DeleteGroupById(GroupId:number){
      return this.http.delete(this.baseUrl+"DeleteGroupById/"+GroupId);
  }

    UpdateTestGroupByID(GroupMaster:GroupMaster)
    {
     const httpOptions={
       headers: new HttpHeaders({
         'Content-Type': 'application/json'
       })
     };
    var body = JSON.stringify(GroupMaster);
   
    return this.http.post(this.baseUrl+'UpdateTestGroupByID',body,httpOptions);
    
    }
    getTestMaster():Observable<TestMaster[]>{
      return this.http.get<TestMaster[]>(this.baseUrl+"getTestMaster")
    }
    SaveTestMaster(TestMaster:TestMaster)
    {
     const httpOptions={
       headers: new HttpHeaders({
         'Content-Type': 'application/json'
       })
     };
    var body = JSON.stringify(TestMaster);
   
    return this.http.post(this.baseUrl+'SaveTestMaster',body,httpOptions);
    
    }
    
 DeleteTestById(TestId:number){
      return this.http.delete(this.baseUrl+"DeleteTestById/"+TestId);
  }
  GetTestinfoById(TestId:number):Observable<TestMaster>{
    return this.http.get<TestMaster>(this.baseUrl+"GetTestinfoById/"+TestId);

  }
  SaveReports(ReportData: ReportData)
  {
   const httpOptions={
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   };
  var body = JSON.stringify(ReportData);
  return this.http.post(this.baseUrl+'SaveReports',body,httpOptions);
  }
  SendReportToEmail(ReportToEmail:ReportToEmail)
  {
  const httpOptions={
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   };
  var body = JSON.stringify(ReportToEmail);
  return this.http.post(this.baseUrl+'SendReportToEmail',body,httpOptions);
  }
  UpdateReportValues(ReportDeatails:ReportDetails[])
  {
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
   var body = JSON.stringify(ReportDeatails);
  
   return this.http.post(this.baseUrl+'UpdateReportValues',body,httpOptions);

  }
 CompleteReport(ReportID: number)
  {
   const httpOptions={
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   };
  var body = JSON.stringify(ReportID);
 
  return this.http.post(this.baseUrl+'CompleteReport',body,httpOptions);
  
  }

  getAllReports(CID:number):Observable<AllReportsInfo[]>{
    return this.http.get<AllReportsInfo[]>(this.baseUrl+"GetAllReport/"+CID);
}
getTestInfo(ReportID:number):Observable<ReportInfo[]>{
  return this.http.get<ReportInfo[]>(this.baseUrl+"getReportDetailsInfo/"+ReportID);
}
}
