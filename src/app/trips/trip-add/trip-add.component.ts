import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Router} from '@angular/router' ;
import { TripService } from '../../services/trip.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.css']
})
export class TripAddComponent implements OnInit {
  tripForm: FormGroup;
  user;
  startMaxNotEditDate;
  startMinDate = new Date();
  startMaxDate = new Date();
  endMinDate = new Date();
  endMaxDate = new Date();
  flightChecked = true;
  accommodationChecked = true;
  transportationChecked = true;

  constructor(private tripService: TripService, private userService: UserService, private fb: FormBuilder, public router: Router, public cd: ChangeDetectorRef) {

   }

  endDateChange(val) {
    this.endMinDate = new Date(val);
  }

  startDateChange(val) {
    console.log('startDateChange', val);
    if (val) {
      this.startMaxNotEditDate = new Date(val);
      this.startMaxDate = new Date(val);
      console.log('this.startMaxDate=====', this.startMaxDate);
    }
  }

  addTrip(destination, fromDate, toDate, description, capacity) {
    var promise = new Promise(resolve => {
      console.log("Flights", this.flightChecked);
      console.log("Accommodation", this.accommodationChecked);
      console.log("Transportation", this.transportationChecked);
      this.tripService.addTrip(destination, fromDate, toDate, description, capacity, this.user, this.flightChecked, this.accommodationChecked, this.transportationChecked);
      resolve();
    });
    promise.then(res => {
      console.log(res);
      this.cd.detectChanges();
      this.router.navigate(['/']);
    });
  }
  
  flightCheckedTrigger() {
    if(this.flightChecked) {
      this.flightChecked = false;
    }
    else if(!this.flightChecked) {
      this.flightChecked = true;
    }
  }

  accommodationCheckedTrigger() {
    if(this.accommodationChecked) {
      this.accommodationChecked = false;
    }
    else if(!this.accommodationChecked) {
      this.accommodationChecked = true;
    }
  }

  transportationCheckedTrigger() {
    if(this.transportationChecked) {
      this.transportationChecked = false;
    }
    else if(!this.transportationChecked) {
      this.transportationChecked = true;
    }
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(res => {
      this.user = res;
    });

    this.tripForm = this.fb.group({
      destination: ['', Validators.required ],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      description: ['', Validators.required ],
      capacity: ['', Validators.required],
      flights: [this.flightChecked, Validators.required],
      accommodation: [this.accommodationChecked],
      transportation: [this.transportationChecked]
    });
  }

}
