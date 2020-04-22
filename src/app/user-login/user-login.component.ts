import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {UserService} from '../services/user.service' ;
import {AppComponent} from '../app.component'
import {Router} from '@angular/router' ;

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  angForm: FormGroup;
  
  constructor(private fb: FormBuilder, public userService: UserService , public router: Router, public cd: ChangeDetectorRef) { 
    this.createForm();
  }
  message: string ;
  loginStatus = false ;


  ngOnInit(): void {
  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  login(username, password){
    this.loginStatus = true ;
    var loginForm = {
      username: username,
      password: password
    }
    console.log(loginForm);
    this.userService.login(loginForm).subscribe(user => {
      if (user) {
        this.userService.logout.next(true);
        this.loginStatus = false ;
        console.log(user['token']);
        localStorage.setItem('token' , user['token']);
        this.cd.detectChanges;
        this.router.navigate(['/user']);
      }
    } , err => {
      this.loginStatus = false ;
      this.router.navigate(['/']);

      this.message = err.error.message ;
    });
  }

}
