import { Component, OnInit } from '@angular/core';
import { PlacesService } from './services/places.service';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public places = []
  public hasPlaces: boolean = false
  public selectedFile = null

  registerForm = new FormGroup({
    name: new FormControl(''),
    location: new FormControl(''),
    description: new FormControl(''),
  })

  constructor(private _placeservice: PlacesService) { }

  onFileSelected(event) {
    // this.selectedFile = <File>event.target.files[0]
    this.selectedFile = event.target.files
  }

  ngOnInit() {
    this._placeservice.getPlaces()
      .subscribe(data => {
        this.hasPlaces = true
        this.places = data
        console.log(this.places)
      })
  }

  onSubmit() {
    // const fd = new FormData()
    // fd.append('image',this.selectedFile ,this.selectedFile.name)
    // for(let key in this.registerForm.value) {
    //   fd.append(key, this.registerForm.value[key])
    // }
    this._placeservice.upload(this.registerForm, this.selectedFile)
      .subscribe(data => {
        console.log(data)
      },
      err => console.log(err))
  }
}
