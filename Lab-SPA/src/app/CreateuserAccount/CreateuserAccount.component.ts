import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/Auth.service';
import { Clients, userInfo} from '../models/AccountSettings';

@Component({
  selector: 'app-CreateuserAccount',
  templateUrl: './CreateuserAccount.component.html',
  styleUrls: ['./CreateuserAccount.component.css'],
  styles: [
    'input.ng-invalid{border-color:red}'
  ]
})
export class CreateuserAccountComponent implements OnInit {
  
  ClientList:Clients[];
  userInfo : userInfo={
    id:0,
    Email:"",
    username:"",
    password:"",
    confirmpassword:"",
    cid:1,
    Role:"U",
    cname:"",
    createddate:null,
    isActive:false
  };

  constructor(private alertify:AlertifyService,private auth:AuthService) { }
  getAllPathalogy()
  {
     this.auth.getAllPathalogy().subscribe((CList:Clients[])=>{
      this.ClientList=CList;
   });
  }
  ngOnInit() {
    this.getAllPathalogy();
       
  }

 onSubmit() {

   this.auth.CreateUserAccount(this.userInfo).subscribe(() => {
    this.alertify.success('User Account Created succssfully!')
   this.ngOnInit();
  }, 
  (error) =>{
    debugger;
     this.alertify.error(error.error);
    }
   
   );
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.userInfo));
  }
}
