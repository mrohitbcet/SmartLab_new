import { Component, OnInit } from '@angular/core';
import { GroupMaster } from '../models/GroupMaster';
import { HttpClient } from '@angular/common/http';
import { LabService } from '../_services/Lab.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { TestMaster } from '../models/TestMaster';
import { error } from 'util';

@Component({
  selector: 'app-Testmaster',
  templateUrl: './Testmaster.component.html',
  styles: [
    'input.ng-invalid{border-color:red}'
  ]
})
export class TestmasterComponent implements OnInit {
  display='none'; //default Variable
 GroupModel=false;
 TestModel=false;
  errormsg:string;
  GroupMaster: GroupMaster = {
  groupId:0,
  groupName:null
  }
  GroupMasterEdit: GroupMaster = {
    groupId:0,
    groupName:null
    }
  TestInfo:TestMaster={
    testId:0,
    testName:"",
    unit:"",
    groupId:0,
    groupName:"",
    normalRange:"",
    price:0,
    isSelected:false
  };
  TestList:TestMaster[];

  Grouplist:GroupMaster[];
  constructor(private http: HttpClient,private labService:LabService,private alertify:AlertifyService,private router: Router) { 

  }

  ngOnInit() {
    this.getAllTestGroups();
    this.getTestMaster();
  }

  AddTestGroup(GroupMaster: GroupMaster) {

    this.labService.AddTestGroup(GroupMaster).subscribe(() => {
    this.alertify.success('Test Group Added succssfully!')
    this.GroupMaster.groupName="";
    this.ngOnInit();
    }, error => {
      this.alertify.error(error)
    
    });
   
  }

 getAllTestGroups()
  {
   this.labService.getAllTestGroups().subscribe((Grouplist:GroupMaster[])=>{
     this.Grouplist=Grouplist;
   });
  }
  GroupinfoById(Id)
  {
    this.labService.GetGroupinfoById(Id).subscribe((GroupMaster: GroupMaster)=>{
     this.GroupMasterEdit=GroupMaster;    
  });
  this.GroupModel=true;
  this.TestModel=false;
  this.openModalDialog();
  }
  DeleteGroupByID(Id)
  {
    if(confirm('Are you sure to delete Test Group?')){
    this.labService.DeleteGroupById(Id).subscribe(()=>{
     this.alertify.success('Group deleted  successfully!')
     this.ngOnInit();
    },error=>{
     this.errormsg="couldn't delete Group";
    })
    }
  }
  UpdateTestGroupByID(GroupMaster: GroupMaster) {

    this.labService.UpdateTestGroupByID(GroupMaster).subscribe(() => {
      this.alertify.success('Group master upadted!')
      this.closeModalDialog();
      this.getAllTestGroups();
    }, error => {
      this.alertify.error(error)
      console.log(error);
    });
    }
    getTestMaster()
    {
    this.labService.getTestMaster().subscribe((TestMasterlist:TestMaster[])=>{
    this.TestList=TestMasterlist;
     });
    }
    SaveTestMaster(TestInfo: TestMaster) {

      this.labService.SaveTestMaster(TestInfo).subscribe(() => {
        this.alertify.success('Test Info Saved Successfully!')
        this.getTestMaster();
        this.TestInfo.testId=0;
       this.TestInfo.testName="";
       this.TestInfo.normalRange="";
       this.TestInfo.price=0;
      this.closeModalDialog();
        
      }, error => {
        this.alertify.error(error)
        console.log(error);
      });
      }

      DeleteTestByID(Id)
      {
        if(confirm('Are you sure to delete Test?')){
        this.labService.DeleteTestById(Id).subscribe(()=>{
         this.alertify.success('Test deleted  successfully!')
         this.ngOnInit();
        },error=>{
         this.errormsg="couldn't delete Test";
        })
        }
      }
      TestinfoById(Id)
      {
        this.labService.GetTestinfoById(Id).subscribe((TestMaster: TestMaster)=>{
        this.TestInfo=TestMaster;    
      });
      this.GroupModel=false;
      this.TestModel=true;
      this.openModalDialog();
      }
    OpenTestModelDialog()
    {
      this.TestModel=true;
      this.GroupModel=false;
      this.openModalDialog();
    
    }
  openModalDialog(){
    this.display='block';
  }
  
  closeModalDialog(){
    this.display='none'; 
}

}
