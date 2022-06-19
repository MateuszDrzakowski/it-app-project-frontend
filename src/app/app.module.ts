import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {WelcomeComponent} from "./home/welcome.component";
import { OfferModule } from './offers/offer.module';

import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {MockedBackendData} from "./mockedBackendData";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {FormsModule} from "@angular/forms";
import { ToolbarComponent } from './main-components/toolbar/toolbar.component';
import { SidenavComponent } from './main-components/sidenav/sidenav.component';
import { MainContentComponent } from './main-components/main-content/main-content.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ToolbarComponent,
    SidenavComponent,
    MainContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OfferModule,
    // InMemoryWebApiModule.forRoot(MockedBackendData, {dataEncapsulation: false, passThruUnknownUrl: true}),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
