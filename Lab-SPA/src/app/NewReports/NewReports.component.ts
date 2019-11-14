import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/Patient.model';
import { GroupMaster } from '../models/GroupMaster';
import { TestMaster } from '../models/TestMaster';
import { AlertifyService } from '../_services/alertify.service';
import { LabService } from '../_services/Lab.service';

@Component({
  selector: 'app-NewReports',
  templateUrl: './NewReports.component.html',
  styleUrls: ['./NewReports.component.css']
})
export class NewReportsComponent implements OnInit {
  display='none';
  TestGroupId:number;
  AllTestList:TestMaster[];
  SelectedTestList:TestMaster[];
  Grouplist:GroupMaster[];
  Plist:Patient[];
  selectedPatient:Patient[];
  selectedPatientCount:number=0;
  patient: Patient = {
    id: 0,
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
  constructor(private alertify:AlertifyService,private labService:LabService) { 

  }

  ngOnInit() {
  }
  SearchPatient()
  {
  this.PatientinfoByName()
  this.openModalDialog();
 }
 PatientinfoByName()
 {  
   this.labService.SearchPatientbyName(this.patient.name).subscribe((PatientList:Patient[])=>{
  this.Plist=PatientList;
  });
 }
 PatientinfoById(id)
 {
  this.closeModalDialog();
   this.selectedPatient= this.Plist.filter(
   patient => patient.id ===id);
   this.getAllTestGroups();
   this.getTestMaster();
   this.selectedPatientCount=1;
}
getAllTestGroups()
{
 this.labService.getAllTestGroups().subscribe((Grouplist:GroupMaster[])=>{
  this.Grouplist=Grouplist;
 });
}
getTestMaster()
{
this.labService.getTestMaster().subscribe((TestMasterlist:TestMaster[])=>{
this.AllTestList=TestMasterlist;
this.SelectedTestList=TestMasterlist;
 });
}
GroupListSelected(value:number){
 if(value==0)
  {
    this.SelectedTestList=this.AllTestList;
  }
  else
  {
  this.SelectedTestList= this.AllTestList.filter(
    test => test.groupId ==value);
  }
}
SaveNewReports()
{
 for (let entry of this.SelectedTestList) {
      
    if(entry.isSelected)
      {
        console.log(entry); 
      }
        
}
}
  openModalDialog(){
 this.display='block'; //Set block css
  }
  
  closeModalDialog(){
  this.display='none'; //set none css after close dialog
  }
}
