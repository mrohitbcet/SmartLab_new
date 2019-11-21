import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { Session } from 'protractor';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public erromsg="ppp";
  model: any = {};
  LoggedUsername:string="";
  constructor(private authService: AuthService, private alertify: AlertifyService,private router: Router) { }

  ngOnInit() {
    this.LoggedUsername=localStorage.getItem("Uname");

  }
  login() {
    
    this.authService.login(this.model).subscribe(next => {
      localStorage.setItem("Uname",this.model.username)
      this.LoggedUsername=localStorage.getItem("Uname");
      this.alertify.success('Logged in successfully')
    }, (error) =>{
      this.alertify.error("Invalid userName/Password")
      }
     );
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out')
    this.router.navigateByUrl('/Home');
}


}
