import { Component, OnInit } from '@angular/core';
import { Doctors } from '../models/Doctors';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/Auth.service';
import { LabService } from '../_services/Lab.service';
import { Router } from '@angular/router';
import { UserForRegisterDto } from '../models/AccountSettings';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  CurrentPassword="";
Newpassword="";
UserForRegisterDto : UserForRegisterDto={
  id:0,
username:"",
newpassword:"",
password:"",
cID:0,
cName:"",
email:"",
accountExpiryDate: new Date() //Need to make it nullable
};


constructor(private alertify:AlertifyService,private auth:AuthService,private labService:LabService,private router: Router) { }


  ngOnInit() {
  }
  ChangepasswordbyUser()
  {
    this.UserForRegisterDto.password=this.CurrentPassword;
    this.UserForRegisterDto.newpassword=this.Newpassword;
    this.UserForRegisterDto.cID=parseInt(localStorage.getItem('CID'));
    this.UserForRegisterDto.username=localStorage.getItem("Uname");
    this.alertify.confirm("Are you sure to change password?",()=>{
      this.auth.ChangePasswordbyUser(this.UserForRegisterDto).subscribe(() => {
         this.alertify.success('Password changed succssfully!')
         this.auth.logout();
     }, 
       (error) =>{
         this.alertify.error(error.error);
         }
        
        );
     
      })


  }
  CancelClick()
  {
    this.router.navigateByUrl('/Home');
  }
}
