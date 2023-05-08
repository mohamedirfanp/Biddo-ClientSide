import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './UserSection/dashboard/dashboard.component';
import { EventComponent } from './UserSection/event/event.component';
import { AuctionComponent } from './VendorSection/auction/auction.component';
import { VendordashboardComponent } from './VendorSection/vendordashboard/vendordashboard.component';
import { ProfileComponent } from './Shared/profile/profile.component';
import { ChatComponent } from './Shared/chat/chat.component';
import { ContactUsComponent } from './Shared/contact-us/contact-us.component';
import { AdmindashboardComponent } from './AdminSection/admindashboard/admindashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch : 'full'},
  { path: 'profile', component: ProfileComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'contactUs', component: ContactUsComponent, canActivate : [AuthGuard]},
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'user/dashboard', component: DashboardComponent, canActivate : [AuthGuard]},
  { path: 'user/event', component: EventComponent, canActivate : [AuthGuard]},
  { path: 'vendor/auction', component: AuctionComponent, canActivate : [AuthGuard]},
  { path: 'vendor/dashboard', component: VendordashboardComponent, canActivate : [AuthGuard]},
  { path: 'admin/dashboard', component: AdmindashboardComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
