import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  public LoginCredential : any = {
    Email : "",
    Password : "",
  };
  public userType: string = "User";
  submit = false;
  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  getSelectedTabIndex(): number {
    return this.tabGroup.selectedIndex;
  }

  onLogin()
  {
    this.userType = this.getSelectedTabIndex() == 0 ? "User" : "Vendor";
    console.log(this.userType);

    return this.authService.onLoginUp(this.userType,this.LoginCredential);

  }
  MoveToSignup(){
    this.router.navigate(['signup']);
  }
  MoveToHome(){
    this.router.navigate(['Home']);
  }
}
