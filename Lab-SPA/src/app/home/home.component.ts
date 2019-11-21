import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jspdf from 'jspdf'; 
 import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode=false;
  employees:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
   
  }
  RegisterToggle()
  {
    this.registerMode=!this.registerMode;
  }

  
}
