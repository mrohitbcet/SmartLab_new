import { Component, OnInit } from '@angular/core';
import { Clients } from '../models/AccountSettings';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/Auth.service';

@Component({
  selector: 'app-CreatePathology',
  templateUrl: './CreatePathology.component.html',
  styleUrls: ['./CreatePathology.component.css'],
  styles: [
    'input.ng-invalid{border-color:red}'
  ]
})
export class CreatePathologyComponent implements OnInit {
  display='none'; //default Variable
  Clients: Clients = {
    cid:0,
    cName:null,
    address:null,
    email:null,
    contact:null
    }
    ClientsEdit:Clients = {
    cid:0,
    cName:null,
    address:null,
    email:null,
    contact:null
    }
    ClientList:Clients[];
constructor(private alertify:AlertifyService,private auth:AuthService) { }

  ngOnInit() {
    this.getAllPathalogy();
  }

  CreatePathalogy(Clients:Clients)
  {
    this.auth.CreatePathalogy(Clients).subscribe(() => {
      this.alertify.success('Pathalogy Created succssfully!')
       this.Clients.cName="";
       this.Clients.address="";
       this.Clients.email="";
       this.Clients.contact="";
       this.ngOnInit();
    }, error => {
      this.alertify.error(error.error)
     
    });
  }
  getAllPathalogy()
  {
     this.auth.getAllPathalogy().subscribe((CList:Clients[])=>{
      this.ClientList=CList;
   });
  }

  PathalogyinfoById(Id)
  {
    this.auth.GetPathalogyinfoById(Id).subscribe((Clients: Clients)=>{
    this.ClientsEdit=Clients;
   this.openModalDialog();
  });
}

UpdatePathalogyByID(Clients:Clients) {

  this.auth.CreatePathalogy(Clients).subscribe(() => {
    this.alertify.success('Pathalogy info updated succssfully!')
    this.Clients.cName="";
    this.Clients.address="";
    this.Clients.email="";
    this.Clients.contact=""
     this.ngOnInit();
     this.closeModalDialog();
  }, error => {
    this.alertify.error(error)
   
  });
  }
openModalDialog(){
  this.display='block';
}

closeModalDialog(){
  this.display='none'; 
}
}
