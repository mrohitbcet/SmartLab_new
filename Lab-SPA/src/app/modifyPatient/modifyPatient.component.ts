import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/Patient.model';
import { LabService } from '../_services/Lab.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-modifyPatient',
  templateUrl: './modifyPatient.component.html',
  styleUrls: ['./modifyPatient.component.css'],
  styles: [
    'input.ng-invalid{border-color:red}'
  ]
})

export class ModifyPatientComponent implements OnInit {
  SearchText:string="";
  PageNo:number=1;
  MaxdateFordatePicker: string;
  display='none'; //default Variable
  patient: Patient = {
    id: 0,
    CID:0,
    OPD:null,
    name: null,
    dateofbirth: null,
    gender: "Male",
    DRrefby:null,
    email: null,
    address: null,
    city: null,
    contactNo: null
    
  }

Plist:Patient[];
  constructor(private http: HttpClient,private labService:LabService,
    private alertify:AlertifyService,private router: Router,private datePipe: DatePipe) { 
      this.MaxdateFordatePicker = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }
  

  ngOnInit() {
  this.getPatientInfo();
}
 getPatientInfo()
 {
  this.labService.getAllPatients().subscribe((PatientList:Patient[])=>{
   this.Plist=PatientList;
  });
 }
 PatientinfoById(Id)
 { this.labService.GetPatientinfoById(Id).subscribe((Patientinfo:Patient)=>{
   this.patient=Patientinfo;
  console.log(Patientinfo);
  });
  this.openModalDialog();
 }
 UpdatePatientInfo(Patient:Patient) {
this.labService.UpdatePatientInfo(Patient).subscribe(() => {
 this.alertify.success('Patient info upadted!')
 this.ngOnInit();
 this.closeModalDialog();
  }, error => {
    this.alertify.error(error)
    console.log(error);
  });
  

}
cancel() {
  console.log('cancelled');
}

 DeletePatient(Id)
 {
  
// if(confirm('Are you sure to delete?'))
// {
//   this.alertify.success('Patient records deleted successfully'+ Id);
//   this.router.navigateByUrl('/ModifyPatient');
// }
 }


 openModalDialog(){
  this.display='block'; //Set block css
}

closeModalDialog(){
this.display='none'; //set none css after close dialog
}

}

