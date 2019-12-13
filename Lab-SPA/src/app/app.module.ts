import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import {FormsModule} from '@angular/forms'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/Auth.service';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './Patient/Patient.component';
import { ThirdPartyService } from './_services/ThirdParty.service';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ModifyPatientComponent } from './modifyPatient/modifyPatient.component';
import { LabService } from './_services/Lab.service';
import { AlertifyService } from './_services/alertify.service';
import { TestmasterComponent } from './Testmaster/Testmaster.component';
import {HttpErrorInterceptor } from './_services/error.interceptor';
import { CreatePathologyComponent } from './CreatePathology/CreatePathology.component';
import { CreateuserAccountComponent } from './CreateuserAccount/CreateuserAccount.component';
import { UserManagementComponent } from './UserManagement/UserManagement.component';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { MustMatchDirective } from './_helpers/must-match.directive';
import { NewReportsComponent } from './NewReports/NewReports.component';
import { AllReportsComponent } from './AllReports/AllReports.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination'
import { ExportReportComponent } from './ExportReport/ExportReport.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { NgxPrintModule } from 'ngx-print';
import { ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      PatientComponent,
      ModifyPatientComponent,
      TestmasterComponent,
      CreatePathologyComponent,
      CreateuserAccountComponent,
      UserManagementComponent,
      MustMatchDirective,
      NewReportsComponent,
      AllReportsComponent,
      ExportReportComponent,
      DoctorsComponent,
      ChangePasswordComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      Ng2SearchPipeModule,
      NgxPaginationModule,
      BsDropdownModule.forRoot(),
      NgxPrintModule
   ],
   providers: [
      AuthService,
      ThirdPartyService,
      LabService,
      AlertifyService,
      DatePipe,
      {
         provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true
       },
      {
       provide:HTTP_INTERCEPTORS,
       useClass:TokenInterceptorService,
       multi:true
      },
      {provide: LocationStrategy, useClass: HashLocationStrategy}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
