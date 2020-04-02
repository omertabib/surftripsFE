import { Component, OnInit } from '@angular/core';
import { TripService } from '../services/trip.service'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  trips;

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.tripService.getTrips().subscribe(res => {
      console.log(res);
      this.trips = res;
    })
  }

}
