import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from "../../environments/environment";
import { PlaceModel } from "../models/place.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _url = environment.apiUrl

  constructor(private http: HttpClient) { }

  getPlaces(): Observable<PlaceModel[]> {
    return this.http.get<PlaceModel[]>(this._url , {
      headers: new HttpHeaders({
        'Content-type' : 'application/json'
      })
    })
  }

  postPlaces(place : PlaceModel): Observable<PlaceModel> {
    return this.http.post<PlaceModel>(this._url + place , {
      headers: new HttpHeaders({
        'Content-type' : 'application/json'
      })
    })
  }
}
