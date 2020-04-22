import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {MatExpansionModule} from '@angular/material/expansion';

import { TripService } from '../../services/trip.service'
import { UserService } from '../../services/user.service';
import { CountriesService } from '../../services/countries.service';

import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-trip-show',
  templateUrl: './trip-show.component.html',
  styleUrls: ['./trip-show.component.css']
})
export class TripShowComponent implements OnInit {
  trip;
  panelOpenState = false;
  tripLoaded = false;
  loadProgress = 0;
  
  constructor(public activeRoute: ActivatedRoute, public tripService: TripService, public countriesService: CountriesService, public cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    const tripId = this.activeRoute.snapshot.paramMap.get('id');
    this.tripService.getTrip(tripId).subscribe(res => {
      this.trip = res;
      this.loadProgress = 25;
      this.cd.detectChanges;
      new Promise(resolve => {
        this.countriesService.getCountryDetails(this.trip.destination).subscribe(res => {
          console.log(res);
          if(res['IsSuccess'] == true) {
            this.trip['countryDetails'] = res['Response'][0];
          }
          this.loadProgress = 50;
          this.cd.detectChanges;
          resolve(this.trip);
        });
      }).then((res) => {
        this.loadProgress = 100;
        this.tripLoaded = true;
        console.log(res);
        this.cd.detectChanges;
      });
    });
  }

}
