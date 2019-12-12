import { Component, OnInit} from '@angular/core';
import { AllReportsInfo,ReportInfo, ReportDetails,ReportToEmail, ReportDataGroupWise,HtmlToEmail} from '../models/Report';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/Auth.service';
import { LabService } from '../_services/Lab.service';
import { DatePipe } from '@angular/common';
import { TestMaster } from '../models/TestMaster';
import * as html2pdf from 'html2pdf.js'
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas';  
import {NgxPrintModule} from 'ngx-print';

@Component({
  selector: 'app-ExportReport',
  templateUrl: './ExportReport.component.html',
  styleUrls: ['./ExportReport.component.css']
})
export class ExportReportComponent implements OnInit {

  display='none';
  SearchText:string="";
  HtmlToEmail: HtmlToEmail={
  content:"",
  toemail:""
  }
  PageNo:number=1;
  GroupPageNo:number=1;
  AllReportsInfo:AllReportsInfo[]=[]
  ReportInfo:ReportInfo[]=[]
  SelectedReport:AllReportsInfo[]=[]
  ReportToEmail:ReportToEmail={
    ReportNo:0,
    ClientName:"",
    Address:"",
    PatientName:"",
    AgeGender:"",
    RefBy:"",
    CollectionDate:null,
    Specimen:"",
    ReportInfo:[]
  }
  CID:number =parseInt(localStorage.getItem('CID'));
  cname:string =localStorage.getItem('cname');
  caddress:string =localStorage.getItem('caddress')+",(M)-"+localStorage.getItem('ccontact');
  ccontact:string =localStorage.getItem('ccontact');
  cemail:string =localStorage.getItem('cemail');
   DispayRptDet:boolean=false;
  isSubmitted:boolean=false;
  CurrentReportID:number;
  LastDaysReports:number=10;
  CurrentReportList:ReportDetails[]=[]
   FilterStatus:number=0;
  CurrentDate = new Date();
  ReportDataGroupWiseList:ReportDataGroupWise[]=[]
  ReportDataGroupWise:ReportDataGroupWise={
    GroupName:"",hideNormalvalue:false,ReportInfo:null
}
   
  constructor(private alertify:AlertifyService,private labService:LabService,private datePipe: DatePipe) { }

  ngOnInit() {
    this.DispayRptDet=false;
   this.getAllReports(this.CID);
  }

  onExportclick()
  {
    const opt = {
      margin: 1,
      filename: 'LabNo-'+this.CurrentReportID+'/'+this.SelectedReport[0].patientName+'/LaboratoryReport.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape',compressPDF: true }
    };
  const content:Element=document.getElementById('CnvasPrint');

  html2pdf().from(content).set(opt).save();
 }
 SendReportHTMLToEmail()
 {
   if(this.SelectedReport[0].email!="")
   {
  this.alertify.confirm("Are you sure you want to send this report to below email?<br>Patient's Email:<span style='color:green'>"+this.SelectedReport[0].email+"</span>",()=>{
    this.HtmlToEmail.content=document.getElementById('CnvasPrint').innerHTML;
    this.HtmlToEmail.toemail=this.SelectedReport[0].email;
    this.labService.SendReportHTMLToEmail(this.HtmlToEmail).subscribe(() => {
      this.alertify.success('Email sent succssfully!')
      
     }, error => {
          this.alertify.error(error)
        
    });
  })
   }
   else{
     this.alertify.warning("Please update patient's valid email Id");
   }

}
 SendReportToEmail()
 {
  
   this.ReportToEmail.ReportNo=this.CurrentReportID;
   this.ReportToEmail.ClientName=this.cname;
   this.ReportToEmail.Address=this.caddress;
   this.ReportToEmail.PatientName=this.SelectedReport[0].patientName;
  this.ReportToEmail.AgeGender=this.GetAge(this.SelectedReport[0].patientDOB) +"/"+this.SelectedReport[0].patientGender;
  this.ReportToEmail.RefBy=this.SelectedReport[0].doctorName;
  this.ReportToEmail.CollectionDate=this.SelectedReport[0].createdDate;
  this.ReportToEmail.Specimen=this.SelectedReport[0].specimen;
  this.ReportToEmail.ReportInfo=this.ReportInfo;
     this.labService.SendReportToEmail(this.ReportToEmail).subscribe(() => {
      this.alertify.success('Email sent succssfully!')
      
     }, error => {
          this.alertify.error(error)
        
    });
}
  getAllReports(CID:number) {
   this.labService.getAllReports(CID).subscribe((ReportInfo:AllReportsInfo[])=>{
   this.AllReportsInfo=ReportInfo;
    });
  }
  GetReportDetailsInfo(ReportID:number,status:string)
  {
    this.DispayRptDet=true;
    this.CurrentReportID=ReportID;
     this.SelectedReport= this.AllReportsInfo.filter(
      Report => Report.reportID ==ReportID);
     this.labService.getTestInfo(ReportID).subscribe((ReportInfo:ReportInfo[])=>{
      this.ReportInfo=ReportInfo;
    this.ReportDataGroupWiseList=[];
    var lookup = {};
      var items=this.ReportInfo;
      
     for (var item, i = 0; item = items[i++];) {
        var groupName = item.groupName;
        var hideNormalvalue=item.hideNormalvalue;
       if (!(groupName in lookup)) {
          lookup[groupName] = 1;
          var Local:ReportDataGroupWise={
            GroupName:"",hideNormalvalue:false,ReportInfo:null
        }
          Local.GroupName=groupName;
          Local.hideNormalvalue=hideNormalvalue;

        var localRptInfo=this.ReportInfo.filter(
            Report => Report.groupName ==groupName);
            Local.ReportInfo=localRptInfo;

          this.ReportDataGroupWiseList.push(Local);
        }
      }

      if(status=="Completed")
      {
        this.isSubmitted=true;
      }
      else
      {
        this.isSubmitted=false;
      }
      
  });

  document.getElementById('btnToggle').click();
}
  UpdateReportValues()
  {
    this.CurrentReportList=[];
    for(let i=0; i<this.ReportInfo.length; i++){
      var local:ReportDetails={
        ReportID:0,
        GroupId:0,
        TestId:0,
        RptDetailsID:this.ReportInfo[i].rptDetailsID,
        TestValue:this.ReportInfo[i].result,
        isHighlight:this.ReportInfo[i].isHighlight
      }
      this.CurrentReportList.push(local);
    }
   this.labService.UpdateReportValues(this.CurrentReportList).subscribe(() => {
      this.alertify.success('Report Updated succssfully!')
      
     }, error => {
          this.alertify.error(error)
        
    });
  }


  ReportInfobyGroup()
  {

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
  onPrintclick()
  {
    document.getElementById('Btnprint').click();
  }
  openModalDialog(){
    this.display='block';
  }
  
  closeModalDialog(){
    this.display='none'; 
  }

}
