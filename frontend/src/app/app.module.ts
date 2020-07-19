import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceCardComponent } from './place-card/place-card.component';
import { HttpClientModule } from "@angular/common/http";
import { PlacesService } from './services/places.service';

@NgModule({
  declarations: [
    AppComponent,
    PlaceCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PlacesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
