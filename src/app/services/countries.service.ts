import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {BehaviorSubject, forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient, private router: Router) { }

  getCountryDetails(country) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/http://countryapi.gear.host/v1/Country/getCountries?pName=${country}`);
  }
}
