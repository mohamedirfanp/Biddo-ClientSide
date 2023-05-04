import { Component } from '@angular/core';
import { SideNavToggle } from 'src/types/struct_SideNav';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Biddo';
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private auth : AuthService){}
  ngOnInit()
  {
    this.auth.autoAuthUser();
    this.auth.autoTimeComplete();
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
