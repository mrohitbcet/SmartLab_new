import { Component, OnInit } from '@angular/core';
import { Clients } from '../models/AccountSettings';
import { Doctors } from '../models/Doctors'; 
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/Auth.service'
import { LabService } from '../_services/Lab.service';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
CID:number=parseInt(localStorage.getItem('CID'));
  display='none'; //default Variable
  Doctorlist: any;
  Doctors:Doctors={
    doctorID:0,
    cID:parseInt(localStorage.getItem('CID')),
    doctorname:"",
    registrationNo:"",
    contact:"",
    email:""
}

DoctorsEdit:Doctors={
  doctorID:0,
  cID:parseInt(localStorage.getItem('CID')),
  doctorname:"",
  registrationNo:"",
  contact:"",
  email:""
}
  
constructor(private alertify:AlertifyService,private auth:AuthService,private labService:LabService) { }

  ngOnInit() {
    this.getDoctors();
    
  }

 DoctorinfoById(doctorID)
  {
   this.openModalDialog();
    this.DoctorsEdit= this.Doctorlist.filter(
     Doctors => Doctors.doctorID ==doctorID)[0];

 }

UpdateDocProfileByID(DoctorsEdit:Doctors) {
  if(DoctorsEdit.doctorID>0){
  this.auth.CreateDocProfiles(DoctorsEdit).subscribe(() => {
    this.alertify.success('Doctor profile updated succssfully!')
    this.closeModalDialog();
   this.ngOnInit();
  }, error => {
    this.alertify.error(error.error)
   });
  }
 }
  CreateDocProfiles(Doctors:Doctors)
  {
    this.auth.CreateDocProfiles(Doctors).subscribe(() => {
      this.alertify.success('Doctor profile created succssfully!')
      this.Doctors.doctorID=0,
      this.Doctors.cID=0,
      this.Doctors.doctorname="",
      this.Doctors.registrationNo="",
      this.Doctors.contact="",
      this.Doctors.email=""
     
       this.ngOnInit();
    }, error => {
      this.alertify.error(error.error)
     
    });

  }
  getDoctors() {
    this.labService.getDoctors(this.CID).subscribe(Response => {
     this.Doctorlist = Response;
    }, error => {
      console.log(error);
    }
    );
  }
openModalDialog(){
  this.display='block';
}

closeModalDialog(){
  this.display='none'; 
}

}
