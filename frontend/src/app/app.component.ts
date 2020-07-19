import { Component, OnInit } from '@angular/core';
import { PlacesService } from './services/places.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public places = []

  constructor(private _placeservice: PlacesService) { }

  ngOnInit() {
    this._placeservice.getPlaces()
      .subscribe(data => { 
        this.places = data 
        console.log(this.places)
      })
  }
}
