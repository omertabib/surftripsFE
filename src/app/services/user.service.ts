import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {BehaviorSubject, forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //uri = 'http://localhost:4001/users';
  uri = 'https://surftrips-backend.herokuapp.com/users';
  
  logout = new BehaviorSubject(false);
  headerUsernameName$ = new BehaviorSubject({});

  constructor(private http: HttpClient, private router: Router) { }

  addUser(firstname, username, email, password) {
    const obj = {
      firstname: firstname,
      username: username,
      email: email,
      password: password
    };
    console.log(obj);
    this.http.post(`${this.uri}/register`, obj).subscribe(res => {
      console.log('Done');
    });
  }

  login(data) {
    return this.http.post(`${this.uri}/authenticate` , data);
  }

  getCurrentUser() {
    const token = localStorage.getItem('token');
    console.log("getCurrentUser token:", token);
    const headers = new HttpHeaders({
    Authorization : `Bearer ${token}`
  });
    return this.http.get(`${this.uri}/current` , {headers});
  }

}
