import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {WelcomeComponent} from "./home/welcome.component";
import { OfferModule } from './offers/offer.module';

import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {OffersData} from "./offers/offersData";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OfferModule,
    InMemoryWebApiModule.forRoot(OffersData, { dataEncapsulation: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
