import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './Patient/Patient.component';
import { ModifyPatientComponent } from './modifyPatient/modifyPatient.component';
import { DropdownDirective } from './Dropdown.directive';
import { TestmasterComponent } from './Testmaster/Testmaster.component';
import { CreatePathologyComponent } from './CreatePathology/CreatePathology.component';
import {CreateuserAccountComponent  } from './CreateuserAccount/CreateuserAccount.component';
import { UserManagementComponent } from './UserManagement/UserManagement.component';
import { NewReportsComponent } from './NewReports/NewReports.component';
import { AllReportsComponent } from './AllReports/AllReports.component';

const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'NewPatient',component:PatientComponent},
  {path:'ModifyPatient',component:ModifyPatientComponent},
  {path:'TestMaster',component:TestmasterComponent},
  {path:'CreatePathology',component:CreatePathologyComponent},
  {path:'CreateuserAccount',component:CreateuserAccountComponent},
  {path:'UserManagement',component:UserManagementComponent},
  {path:'NewReports',component:NewReportsComponent},
  {path:'AllReports',component:AllReportsComponent},
{path:'**',component:HomeComponent,pathMatch:'full'}
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})
   ],
   exports: [
      RouterModule
   ],
   declarations: [
      DropdownDirective
   ]
})
export class AppRoutingModule { }