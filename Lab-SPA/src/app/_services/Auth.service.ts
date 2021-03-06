import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Patient } from '../models/Patient.model';
import { Doctors } from '../models/Doctors'; 
import { Session } from 'inspector';
import { Clients,userInfo, UserForRegisterDto} from '../models/AccountSettings';
import { Observable, throwError} from 'rxjs';
import { AppErrorHandler } from '../models/AppErrorHandler';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl='http://bansaruli.in/api/auth/'
//baseUrl = 'http://localhost:5000/api/auth/'
constructor(private http: HttpClient,private alertify: AlertifyService,private router: Router) { }
CreateUserAccount(userInfo:userInfo)
{ const httpOptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
 var body = JSON.stringify(userInfo);

 return this.http.post(this.baseUrl+'register',body,httpOptions);
                      
}
getAllUsers():Observable<UserForRegisterDto[]>{
  return this.http.get<UserForRegisterDto[]>(this.baseUrl+"GetAllUsers")
}
UpdateAccountExpiryDate(UserForRegisterDto:UserForRegisterDto)
{
   const httpOptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
 var body = JSON.stringify(UserForRegisterDto);

 return this.http.post(this.baseUrl+'UpdateAccountExpiryDate',body,httpOptions);
                      
}
ChangePassword(UserForRegisterDto:UserForRegisterDto)
{
   const httpOptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
 var body = JSON.stringify(UserForRegisterDto);

 return this.http.post(this.baseUrl+'ChangePassword',body,httpOptions);
                      
}
   
ChangePasswordbyUser(UserForRegisterDto:UserForRegisterDto)
{
   const httpOptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
 var body = JSON.stringify(UserForRegisterDto);

 return this.http.post(this.baseUrl+'ChangePasswordbyUser',body,httpOptions);
                      
}
CreateDocProfiles(Doctors:Doctors){
  const httpOptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
 var body = JSON.stringify(Doctors);

 return this.http.post(this.baseUrl+'CreateDocProfiles',body,httpOptions);
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
       localStorage.setItem('CID',user.cid);
       localStorage.setItem('Role',user.role);
       localStorage.setItem('accountexpiry',user.accountexpiry);
       localStorage.setItem("cname",user.cname)
       localStorage.setItem("caddress",user.address)
       localStorage.setItem("cemail",user.email)
       localStorage.setItem("ccontact",user.contact)
       }
   }));
 }
getToken()
{
  return localStorage.getItem('token');
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('CID');
  localStorage.removeItem('Role');
  localStorage.removeItem('accountexpiry');
  localStorage.removeItem("cname")
  localStorage.removeItem("caddress")
  localStorage.removeItem("cemail")
  localStorage.removeItem("ccontact")
  this.alertify.message('Logged out')
  this.router.navigateByUrl('/Home');
}

}
