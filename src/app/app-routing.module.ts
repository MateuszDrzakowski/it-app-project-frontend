import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OfferListComponent} from "./offers/offer-list.component";
import {OfferDetailComponent} from "./offers/offer-detail.component";
import {WelcomeComponent} from "./home/welcome.component";

const routes: Routes = [
  { path: 'offers', component: OfferListComponent },
  { path: 'offers/:id', component: OfferDetailComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
