import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {BehaviorSubject, forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  //uri = 'http://localhost:4001/trips';
  uri = 'https://surftrips-backend.herokuapp.com/trips';

  constructor(private http: HttpClient, private router: Router) { }

  addTrip(destination, description, user) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    const obj = {
      destination: destination,
      description: description,
      user: user._id
    };
    console.log(obj);
    this.http.post(`${this.uri}/create`, obj, {headers}).subscribe(res => {
      console.log('Done');
    });
  }

  getTrips() {
    return this.http.get(`${this.uri}/`);
  }

}
