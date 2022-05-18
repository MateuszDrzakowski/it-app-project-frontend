import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {OfferListComponent} from "./offers/offer-list.component";
import {FormsModule} from "@angular/forms";
import {ConvertToSpacesPipe} from "./shared/custom_pipes/convert-to-spaces.pipe";
import {StarComponent} from "./shared/star.component";
import {HttpClientModule} from "@angular/common/http";
import { OfferDetailComponent } from './offers/offer-detail.component';
import {WelcomeComponent} from "./home/welcome.component";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    OfferListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    OfferDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
