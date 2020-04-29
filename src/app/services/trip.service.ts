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

  addTrip(destination, fromDate, toDate, description, capacity, user, flightChecked, accommodationChecked, transportationChecked) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    const obj = {
      destination: destination,
      fromDate: fromDate,
      toDate: toDate,
      description: description,
      capacity: capacity,
      user: user._id,
      flightsIncluded: flightChecked,
      accommodationIncluded: accommodationChecked,
      transportationIncluded: transportationChecked
    };
    console.log(obj);
    this.http.post(`${this.uri}/create`, obj, {headers}).subscribe(res => {
      console.log('Done');
    });
  }

  getTrips() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    });
    return this.http.get(`${this.uri}/`);
  }

  getTrip(id) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    const obj = {
      id: id
    };
    console.log(id);
    return this.http.post(`${this.uri}/getTrip`, obj,{headers});
  }

  getUserTrips(id) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    return this.http.get(`${this.uri}/getUserTrips/${id}`, {headers});
  }

  joinTrip(trip, user) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });

    var obj = {
      trip: trip,
      user: user
    }
    return this.http.post(`${this.uri}/joinTrip`, obj, {headers});
  }
}
