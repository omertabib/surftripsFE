import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component'
import { UserGetComponent } from './user-get/user-get.component'
import { UserEditComponent } from './user-edit/user-edit.component'
import { UserLoginComponent } from './user-login/user-login.component'
import { TripAddComponent } from './trips/trip-add/trip-add.component'
import { FeedComponent } from './feed/feed.component'
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { TripShowComponent } from './trips/trip-show/trip-show.component';


const routes: Routes = [
  {
    path: '',
    component: FeedComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'signup',
    component: UserAddComponent
  },
  {
    path: 'addTrip',
    component: TripAddComponent
  },
  {
    path: 'trip/:id',
    component: TripShowComponent
  },
  {
    path: 'user/edit/:id',
    component: UserEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserGetComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
