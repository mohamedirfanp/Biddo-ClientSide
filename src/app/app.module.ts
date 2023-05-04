import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// // for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnugularMaterialModule } from './angular.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';

// External Module
import { EditorModule } from '@tinymce/tinymce-angular';
import { TagInputModule } from 'ngx-chips';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DialogModule } from 'primeng/dialog';

// Components
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BodyComponent } from './body/body.component';
import { DashboardComponent } from './UserSection/dashboard/dashboard.component';
import { EventComponent } from './UserSection/event/event.component';
import { ContactUsComponent } from './UserSection/contact-us/contact-us.component';
import { VendordashboardComponent } from './VendorSection/vendordashboard/vendordashboard.component';
import { AuctionComponent } from './VendorSection/auction/auction.component';

// Icon Module
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SelectedServiceComponent } from './UserSection/selected-service/selected-service.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProfileComponent } from './Shared/profile/profile.component';
import { ChatComponent } from './Shared/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavBarComponent,
    BodyComponent,
    DashboardComponent,
    EventComponent,
    ContactUsComponent,
    VendordashboardComponent,
    AuctionComponent,
    SelectedServiceComponent,
    ProfileComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AnugularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    EditorModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    LoadingBarRouterModule,
    TagInputModule,
    NgxMaterialTimepickerModule,
    DialogModule
  ],
  providers: [AuthGuard,{
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  },ConfirmationService, MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas,far)
  }
 }
