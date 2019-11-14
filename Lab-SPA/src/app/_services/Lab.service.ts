import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import { Patient } from '../models/Patient.model';
import { GroupMaster } from '../models/GroupMaster';
import { Observable, throwError } from 'rxjs';
import { TestMaster } from '../models/TestMaster';
@Injectable({
  providedIn: 'root'
})
export class LabService {
  
  baseUrl = 'http://localhost:5000/api/Lab/'
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
  getAllPatients():Observable<Patient[]>{
  return this.http.get<Patient[]>(this.baseUrl+"patientinfo");
  }
  SearchPatientbyName(name:string):Observable<Patient[]>{
    return this.http.get<Patient[]>(this.baseUrl+"SearchPatientbyName/"+name);
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
 return this.http.put(this.baseUrl+'UpdatePatientinfoById',body,httpOptions);
  
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
   
    return this.http.put(this.baseUrl+'UpdateTestGroupByID',body,httpOptions);
    
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


}
