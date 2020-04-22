import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import Swal from 'sweetalert2';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';


import { TripService } from '../services/trip.service'
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  trips;
  user;
  
  tripsLoading = true;

  isLoggedIn(): boolean {
    if(localStorage.getItem('token')) return true;
  }

  constructor(
    public tripService: TripService, 
    public userService: UserService, 
    public cd: ChangeDetectorRef, 
    private _snackBar: MatSnackBar) 
  {}
  

  joinTrip(trip) {
    new Promise(resolve => {
      this.tripService.joinTrip(trip, this.user).subscribe(res => {
        if(res['status'] == 200) {
          this._snackBar.open("You've joined the trip! 🎊 🎉", "Woohoo!", {
            duration: 2000,
          });
          trip['userIsMember'] = true;
          trip['membersCount'] = trip.membersCount + 1;
        }
        else if(res['status'] == 201) {
          this._snackBar.open("You've left the trip!", "Feeling sad!", {
            duration: 2000,
          });
          trip['userIsMember'] = false;
          trip['membersCount'] = trip.membersCount - 1;
        }
        console.log(res);
        resolve(res);
      },
      err => {
        Swal.fire({
          title: "Oops..",
          html: err.error.message,
          icon: "error"
        }).then(() => {
          this.cd.detectChanges;
          console.error(err);
        });
      });
    }).then(() => {
      this.cd.detectChanges();
    });
  }

  isUserMember() {
    if(this.user && this.trips) {
      this.trips.forEach(trip => {
        trip.members.forEach(member => {
          if(member._id == this.user._id) {
            trip['userIsMember'] = true;
          }
        });
      });
    }
  }

  ngOnInit(): void {
    var userPromise = new Promise(resolve => {
      this.userService.getCurrentUser().subscribe(user => {
        this.user = user;
        resolve();  
      });
    })
    
    var tripsPromise = new Promise(resolve => {
      this.tripService.getTrips().subscribe(res => {
        console.log(res);
        this.trips = res;
        resolve();
      });
    });

    if(this.isLoggedIn()) {
      userPromise.then(() => {
          tripsPromise.then(() => {
            this.trips.forEach(trip => {
              trip['membersCount'] = trip.members.length;
            });
            this.isUserMember();
            this.tripsLoading = false;
          });
      });
    }

    else if(!this.isLoggedIn()) {
      tripsPromise.then(() => {
        this.trips.forEach(trip => {
          trip['membersCount'] = trip.members.length;
        });
        this.tripsLoading = false;
      });
    }
  }

}
