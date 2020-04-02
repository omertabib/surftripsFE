import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  constructor(private tripService: TripService, private userService: UserService, private fb: FormBuilder) {

   }

  addTrip(destination, description) {
    this.tripService.addTrip(destination, description, this.user);
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(res => {
      this.user = res;
    });

    this.tripForm = this.fb.group({
      destination: ['', Validators.required ],
      description: ['', Validators.required ],
    });
  }

}
