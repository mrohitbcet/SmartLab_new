import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/Patient.model';
import { GroupMaster } from '../models/GroupMaster';
import { TestMaster } from '../models/TestMaster';
import { AlertifyService } from '../_services/alertify.service';
import { LabService } from '../_services/Lab.service';
import { DatePipe } from '@angular/common';
import { Doctor } from '../Patient/Patient.component';
import { ReportData, Report, ReportDetails } from '../models/Report';

@Component({
  selector: 'app-NewReports',
  templateUrl: './NewReports.component.html',
  styleUrls: ['./NewReports.component.css']
})
export class NewReportsComponent implements OnInit {
  today = new Date();
  TestModel=false;
  isPrivew:boolean=false;
  display='none';
  Doctors: any;
  SelectedDoctor: any;
  TestGroupId:number=0;
  DoctorId:number=0;
  Specimen:"";
  AllTestList:TestMaster[];
  FliteredTestList:TestMaster[];
  SelectedTestList:TestMaster[];
  Grouplist:GroupMaster[];
  Plist:Patient[];
  selectedPatient:Patient[];
  selectedPatientCount:number=0;
  CID:number =parseInt(localStorage.getItem('CID'));
  Report:Report={
    ReportID:0,
    PatientID:0,
    DoctorID:0,
    CID:0,
    CreatedBy:"",
    CreatedDate:null,
    isbtnDisabled:false,
    Status:"",
    specimen:""
}
ReportTest:ReportDetails={
  RptDetailsID:0,
  ReportID:0,
  GroupId:0,
  TestId:0,
  TestValue:"",
  isHighlight:false
}
ReportTestList:ReportDetails[]
ReportData:ReportData={
  Report:this.Report,
  ReportDetails:this.ReportTestList 
}
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
  constructor(private alertify:AlertifyService,private labService:LabService,private datePipe: DatePipe) { 

 }

  ngOnInit() {
  }
  SearchPatient()
  {this.TestModel=false;
  this.PatientinfoByName();
  this.openModalDialog();
 }
 PatientinfoByName()
 {  
   this.labService.SearchPatientbyName(this.patient.name,this.CID).subscribe((PatientList:Patient[])=>{
  this.Plist=PatientList;
  });
 }
 PatientinfoById(id)
 {
  this.closeModalDialog();
   this.selectedPatient= this.Plist.filter(
   patient => patient.id ===id);
  let selected=this.selectedPatient[0].name;
  this.getDoctors();
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
this.FliteredTestList=TestMasterlist;
 });
}
GroupListSelected(value:number){
 if(value==0)
  {
    this.FliteredTestList=this.AllTestList;
  }
  else
  {
  this.FliteredTestList= this.AllTestList.filter(
    test => test.groupId ==value);
  }
}
DoctorSelected(value:number){
 this.SelectedDoctor= this.Doctors.filter(
    Doctor => Doctor.doctorID ==value);
  //let DoctorName=this.SelectedDoctor[0].doctorname;
 }
getDoctors() {
  this.labService.getDoctors(this.CID).subscribe(Response => {
   this.Doctors = Response;
  }, error => {
    console.log(error);
  }
  );
}
previewReport()
{
this.TestModel=true;
this.isPrivew=true;

this.SelectedTestList= this.AllTestList.filter(
  test => test.isSelected ==true);
  this.SelectedTestList.sort((a, b) => (a.groupName > b.groupName) ? 1 : -1);
}
CancelPreview()
{
  this.isPrivew=false;
}
SaveReport()
{
  if(this.SelectedTestList.length==0)
  {
    this.alertify.error('Please select at least one test to create this report!');
    return;
  }
  this.Report.isbtnDisabled=true;
  this.Report.PatientID=this.selectedPatient[0].id;
  this.Report.DoctorID =this.DoctorId;
  this.Report.CID =parseInt(localStorage.getItem('CID'));
  this.Report.CreatedBy=localStorage.getItem('Uname');
  this.Report.Status="Pending";
  this.Report.specimen=this.Specimen;
  this.Report.CreatedDate=new Date();
  this.ReportTestList =[];
  this.ReportTestList.length=0;
  console.log(this.SelectedTestList);
  for(let i=0; i<this.SelectedTestList.length; i++){
    var local:ReportDetails={
      RptDetailsID:0,
      ReportID:0,
      GroupId: this.SelectedTestList[i].groupId,
      TestId:this.SelectedTestList[i].testId,
      TestValue:"",
      isHighlight:false
    }
   this.ReportTestList.push(local);
  console.log(local);
}


  this.ReportData.Report=this.Report;
  this.ReportData.ReportDetails=this.ReportTestList;
  this.labService.SaveReports(this.ReportData).subscribe(() => {
  this.alertify.success('Report Added succssfully!')
   this.getTestMaster();
   this.closeModalDialog();
   this.Report.isbtnDisabled=false;
   this.isPrivew=false;
 }, error => {
      this.alertify.error(error)
    
    });

}
  openModalDialog(){
 this.display='block'; //Set block css
  }
  
  closeModalDialog(){
  this.display='none'; //set none css after close dialog
  }
}
