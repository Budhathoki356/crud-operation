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
    return this.http.get<PlaceModel[]>(this._url, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }

  upload(data: any, files) {
    const formData = new FormData();
    const xhr = new XMLHttpRequest();
    // append image only if we have files
    if (files && files[0]) {
      formData.append('image', files[0], files[0].name);
    }
    // data ready for BE
    for (let key in data) {
      formData.append(key, data[key]);
    }
    let upload = new Observable((observer) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            observer.next(xhr.response);
          } else {
            observer.error(xhr.response);
          }
        }
      }
    })

    // let URL: string, method: string;
    // if (data._id) {
    //   URL = `${this._url}/${data._id}`
    //   method = "PUT";
    // } else {
    //   URL = `${this._url}`
    //   method = "POST";
    // }


    xhr.open('post', this._url, true);

    xhr.send(formData);

    return upload;
  }

  // delete

  remove(id: any) {
    return this.http.delete(this._url +'/' + id, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }


}
