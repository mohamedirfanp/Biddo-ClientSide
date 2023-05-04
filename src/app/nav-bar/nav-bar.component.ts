import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { SideNavToggle } from 'src/types/struct_SideNav';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  public isLoggedIn = false;
  public Role : string = "";

  private authServiceSubs : Subscription;

  constructor(private authService : AuthService) {
    this.isLoggedIn = this.authService.getisAuth();
    this.Role = this.authService.getRole();

    this.authServiceSubs = this.authService.getauthStatusListener().subscribe((response) => {
      this.isLoggedIn = response.isAuth;
      this.Role = response.Role
      console.log(response);
      
    });
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
  collapsed: boolean = false;
  screenWidth = 0;

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  OnLogout()
  {
    this.authService.onLogout();
  }
}
