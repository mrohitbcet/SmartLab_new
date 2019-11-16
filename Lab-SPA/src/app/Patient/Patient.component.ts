import { Component, OnInit } from '@angular/core';
import { ThirdPartyService } from '../_services/ThirdParty.service';
import { AuthService } from '../_services/Auth.service';
import { DatePipe } from '@angular/common';
import { parse } from 'url';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/Patient.model'
import { AlertifyService } from '../_services/alertify.service';
import { LabService } from '../_services/Lab.service';

@Component({
  selector: 'app-Patient',
  templateUrl: './Patient.component.html',
  styles: [
    'input.ng-invalid{border-color:red}'
  ]
})
export class PatientComponent implements OnInit {
  CurrentDatestr: string;
  MaxdateFordatePicker: string;

  model: any = {};
  PIN: string;
  Doctors: any;
  patient: Patient = {
  id: 0,
  CID:0,
  OPD: null,
  name: null,
  dateofbirth: null,
  gender: "Male",
  DRrefby:null,
  email: null,
 address: null,
  city: null,
  contactNo: null
  }

  constructor(private ThirdPartService: ThirdPartyService, private authService: AuthService, private datePipe: DatePipe, private http: HttpClient,private alertify:AlertifyService,private labService:LabService) {

    this.CurrentDatestr = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.MaxdateFordatePicker = this.datePipe.transform(new Date(), "yyyy-MM-dd");

  }

  ngOnInit() {
    this.getDoctors();

  }
  Patientregister(NewPatient:Patient) {
    NewPatient.CID=parseInt(localStorage.getItem('CID'));
    this.labService.Patientregister(NewPatient).subscribe(() => {
      this.alertify.success('Patient Info added succssfully!')
      NewPatient.id=0;
      NewPatient.OPD="";
      NewPatient.name="";
      NewPatient.dateofbirth=null;
      NewPatient.gender="";
      NewPatient.DRrefby=null;
      NewPatient.email=null;
      NewPatient.address=null;
      NewPatient.city=null;
      NewPatient.contactNo=null;
      
   }, error => {
      this.alertify.error(error)
    
    });
  }
  cancel() {
    console.log('cancelled');
  }
  GetAge(dt: any): number {
    let age = 0;
    if (dt) {
      const birthday = new Date(dt);
      const today = new Date();
      age = today.getFullYear() - birthday.getFullYear();
      const m = today.getMonth() - birthday.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
        age--;
      }
    }
    return age;

  }

  GetCityStatebyPIN(event: any) {
    this.PIN = event.target.value;
    this.ThirdPartService.CityState(this.PIN).subscribe(data => {
      console.log(data);
    }, error => {
      console.log('Failed to reterieve data');
    });
  }
  getDoctors() {
    this.labService.getDoctors().subscribe(Response => {
     this.Doctors = Response;
    }, error => {
      console.log(error);
    }
    );

}
}

export class Doctor {

  constructor(public id: number, public name: string) {


  }
}