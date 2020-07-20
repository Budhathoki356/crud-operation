import { Component, OnInit, Input } from '@angular/core';
import { environment } from "../../environments/environment";
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent implements OnInit {

  imgUrl: String = environment.imgUrl

  @Input() place: any

  constructor(private _placeService: PlacesService) {  }

  removePlace(id: any) {
    this._placeService.remove(id)
        .subscribe(data=> {
          console.log(data)
        })
  }

  ngOnInit(): void {
  }

}
