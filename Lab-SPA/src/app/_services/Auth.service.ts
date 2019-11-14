import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Patient } from '../models/Patient.model';
import { Session } from 'inspector';
import { Clients,userInfo} from '../models/AccountSettings';
import { Observable, throwError} from 'rxjs';
import { AppErrorHandler } from '../models/AppErrorHandler';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl='http://localhost:5000/api/auth/'
constructor(private http: HttpClient) { }
CreateUserAccount(userInfo:userInfo)
{
 
  const httpOptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
 var body = JSON.stringify(userInfo);

 return this.http.post(this.baseUrl+'register',body,httpOptions);
                      
}
CreatePathalogy(Clients:Clients)
{
  const httpOptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
 var body = JSON.stringify(Clients);

 return this.http.post(this.baseUrl+'CreatePathalogy',body,httpOptions);
}

getAllPathalogy():Observable<Clients[]>{
 return this.http.get<Clients[]>(this.baseUrl+"getAllPathalogy")
  }
  GetPathalogyinfoById(cid:number):Observable<Clients>{
    return this.http.get<Clients>(this.baseUrl+"GetPathalogyinfoById/"+cid);
 }
 login(model:any)
 {
 return this.http.post(this.baseUrl+'login',model)
 .pipe(
   map((response:any)=>{
     const user=response;
     if(user){
       localStorage.setItem('token',user.token);
       }
   }));
 }
getToken()
{
  return localStorage.getItem('token');
}


}
