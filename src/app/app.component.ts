import { Component } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  display = true;

  isLoggedIn(): boolean {
    if(localStorage.getItem('token')) return true;
  }

  isProvider(): boolean {
    if(this.user && this.user.role == 2) {
      return true;
    }
    return false;
  }
  user: any  ;
  username: any ;
  email: any;

  constructor(private router: Router, private _loadingBar: SlimLoadingBarService, private _router: Router, private userService: UserService) {
    this.userService.headerUsernameName$.subscribe(user =>{    
      this.username  = user['username'] ;
      this.email = user['email'];
    });

    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });

    if (!this.isLoggedIn()) {
      //this.router.navigate(['login']);
      console.log('router=====', this.router.url);
    }
    else if(this.isLoggedIn()) {
      console.log("Logged in: ", localStorage.getItem('token'))
      
      this.userService.getCurrentUser().subscribe(user => {
        this.user = user;
        console.log('user=======', this.user);
        this.userService.headerUsernameName$.next({ email : user['email'], username : user['username']});
        localStorage.setItem('username', user['username']);
        localStorage.setItem('email', user['email']);
        // this.ref.detectChanges();
      });
    }

    this.userService.logout.subscribe(x => {
      this.display = x ;
      console.log(this.display);
    });

  }
  
  logout() {
      this.display = false ;
      localStorage.removeItem('username') ;
      localStorage.removeItem('email') ;
      localStorage.removeItem('name') ;

      localStorage.removeItem('token') ;
      this.router.navigate(['/']);
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }
}
