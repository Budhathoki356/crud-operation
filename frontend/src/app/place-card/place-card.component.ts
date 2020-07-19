import { Component, OnInit, Input } from '@angular/core';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent implements OnInit {

  imgUrl: String = environment.imgUrl

  @Input() place: any

  constructor() {  }

  ngOnInit(): void {
  }

}
