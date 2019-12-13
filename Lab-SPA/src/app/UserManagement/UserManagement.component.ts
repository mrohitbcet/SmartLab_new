import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/Auth.service';
import { Clients,userInfo, UserForRegisterDto} from '../models/AccountSettings';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-UserManagement',
  templateUrl: './UserManagement.component.html',
  styleUrls: ['./UserManagement.component.css']
})
export class UserManagementComponent implements OnInit {
  SearchText:string="";
  PageNo:number=1;
  UserForRegisterDto : UserForRegisterDto={
    id:0,
  username:"",
  password:"",
  newpassword:"",
  cID:0,
  cName:"",
  email:"",
  accountExpiryDate:null
 };

  constructor(private alertify:AlertifyService,private auth:AuthService, private datePipe: DatePipe) { }
  UserForRegisterDtoList:UserForRegisterDto[];
  MaxdateFordatePicker = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers()
  {
    this.auth.getAllUsers().subscribe((UserForRegisterDto:UserForRegisterDto[])=>{
      this.UserForRegisterDtoList=UserForRegisterDto;
  })
}
UpdateAccountExpiryDate(Id:number,username:string,cName:string,accountExpiryDate:Date)
{
 this.alertify.confirm("Username:"+username+"<br>Pathalogy:"+cName+"<br> New expiry date:<b>"+accountExpiryDate +"</b><br>Are you sure to update expiry date ?",()=>{
  this.UserForRegisterDto.id=Id;
  this.UserForRegisterDto.username=username;
  this.UserForRegisterDto.accountExpiryDate=accountExpiryDate;
this.auth.UpdateAccountExpiryDate(this.UserForRegisterDto).subscribe(() => {
    this.alertify.success('Account expiry date updated succssfully!')
   this.ngOnInit();
  }, 
  (error) =>{
    this.alertify.error(error.error);
    }
   
   );

 })
 

 

}
ChangePassword(Id:number,username:string,cName:string,accountExpiryDate:Date)
{
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
  const lengthOfCode =10;
  var Newpassword=this.makeRandom(lengthOfCode, possible);
  this.alertify.confirm("Username:"+username+"<br>Pathalogy:"+cName+"<br> New password:<b>"+Newpassword +"</b><br>Are you sure to change password?",()=>{
   this.UserForRegisterDto.id=Id;
    this.UserForRegisterDto.username=username;
    this.UserForRegisterDto.password=Newpassword;
    this.UserForRegisterDto.accountExpiryDate=accountExpiryDate;
    this.auth.ChangePassword(this.UserForRegisterDto).subscribe(() => {
      this.alertify.success('Password changed succssfully!')
     this.ngOnInit();
    }, 
    (error) =>{
      this.alertify.error(error.error);
      }
     
     );
  
   })
   
}
makeRandom(lengthOfCode: number, possible: string) {
  let text = "";
  for (let i = 0; i < lengthOfCode; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
    return text;
}
}
