import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./home/welcome.component";
import {OfferModule} from "./offers/offer.module";
import {UserProfileComponent} from "./profiles/user-profile/user-profile.component";

const routes: Routes = [
  { path: 'user-profile/:userId', component: UserProfileComponent},
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: '**', redirectTo: 'welcome', pathMatch: 'full'},

];

@NgModule({
  imports: [OfferModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
