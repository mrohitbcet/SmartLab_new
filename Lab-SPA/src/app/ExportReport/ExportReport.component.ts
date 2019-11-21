import { Component, OnInit} from '@angular/core';
import { AllReportsInfo,ReportInfo, ReportDetails } from '../models/Report';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/Auth.service';
import { LabService } from '../_services/Lab.service';
import { DatePipe } from '@angular/common';
import { TestMaster } from '../models/TestMaster';
import * as html2pdf from 'html2pdf.js'
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-ExportReport',
  templateUrl: './ExportReport.component.html',
  styleUrls: ['./ExportReport.component.css']
})
export class ExportReportComponent implements OnInit {

  display='none';
  SearchText:string="";
  PageNo:number=1;
  AllReportsInfo:AllReportsInfo[]=[]
  ReportInfo:ReportInfo[]=[]
  SelectedReport:AllReportsInfo[]=[]
  CID:number =parseInt(localStorage.getItem('CID'));
  DispayRptDet:boolean=false;
  isSubmitted:boolean=false;
  CurrentReportID:number;
  LastDaysReports:number=10;
  CurrentReportList:ReportDetails[]=[]
   FilterStatus:number=0;
  CurrentDate = new Date();
  constructor(private alertify:AlertifyService,private labService:LabService,private datePipe: DatePipe) { }

  ngOnInit() {
    this.DispayRptDet=false;
   this.getAllReports(this.CID);
  }
  onExportclick2()
  {
    const opt = {
      margin: 1,
      filename: 'LaboratoryReport.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
  const content:Element=document.getElementById('div1');

  html2pdf().from(content).set(opt).save();
  }
  onExportclick()
  {
    const opt = {
      margin: 1,
      filename: 'LaboratoryReport.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
  const content:Element=document.getElementById('CnvasPrint');

  html2pdf().from(content).set(opt).save();
 

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
      console.log(this.SelectedReport);
this.labService.getTestInfo(ReportID).subscribe((ReportInfo:ReportInfo[])=>{
      this.ReportInfo=ReportInfo;
     
      if(status=="Completed")
      {
        this.isSubmitted=true;
      }
      else
      {
        this.isSubmitted=false;
      }
      
  });

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
  CompleteReport()
  {
    
    if(confirm('Are you sure to complete this report?'))
    {
     
    this.labService.CompleteReport(this.CurrentReportID).subscribe(() => {
      this.alertify.success('Report Completed succssfully!')
      this.ngOnInit()
     }, error => {
          this.alertify.error(error)
        
        });
      }
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
  openModalDialog(){
    this.display='block';
  }
  
  closeModalDialog(){
    this.display='none'; 
  }

}
