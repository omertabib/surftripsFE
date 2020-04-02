import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserGetComponent } from './user-get/user-get.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserLoginComponent } from './user-login/user-login.component';

import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service'
import { AuthService } from './services/auth.service';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { FeedComponent } from './feed/feed.component';
import { TripAddComponent } from './trips/trip-add/trip-add.component';


@NgModule({
  declarations: [
    AppComponent,
    UserAddComponent,
    UserGetComponent,
    UserEditComponent,
    UserLoginComponent,
    FeedComponent,
    TripAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SlimLoadingBarModule,
  ],
  providers: [UserService, AuthGuardService, AuthService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
