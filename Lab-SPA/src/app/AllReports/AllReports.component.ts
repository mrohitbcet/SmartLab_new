import { Component, OnInit } from '@angular/core';
import { AllReportsInfo } from '../models/Report';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/Auth.service';
import { LabService } from '../_services/Lab.service';
import { DatePipe } from '@angular/common';
import { TestMaster } from '../models/TestMaster';


@Component({
  selector: 'app-AllReports',
  templateUrl: './AllReports.component.html',
  styleUrls: ['./AllReports.component.css']
})
export class AllReportsComponent implements OnInit {

  AllReportsInfo:AllReportsInfo[]=[]
  CID:number =parseInt(localStorage.getItem('CID'));
  constructor(private alertify:AlertifyService,private labService:LabService,private datePipe: DatePipe) { }

  ngOnInit() {
   this.getAllReports(this.CID);
  }
  getAllReports(CID:number) {
   this.labService.getAllReports(CID).subscribe((ReportInfo:AllReportsInfo[])=>{
   this.AllReportsInfo=ReportInfo;
    });
  }
}
