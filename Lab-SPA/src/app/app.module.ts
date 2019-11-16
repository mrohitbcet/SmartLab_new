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
import { DatePipe } from '@angular/common';
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
      AllReportsComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot()
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
      }     
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
