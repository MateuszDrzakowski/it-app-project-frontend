import { NgModule } from '@angular/core';
import {OfferListComponent} from "./offer-list/offer-list.component";
import {OfferDetailComponent} from "./offer-detail/offer-detail.component";
import {ConvertToSpacesPipe} from "../shared/custom_pipes/convert-to-spaces.pipe";
import {RouterModule} from "@angular/router";
import {OfferDetailGuard} from "./offer-detail/offer-detail.guard";
import { SharedModule } from '../shared/shared.module';
import { OfferAddComponent } from './offer-add/offer-add.component';
import {ReactiveFormsModule} from "@angular/forms";
import { OfferEditComponent } from './offer-edit/offer-edit.component';
import {OfferEditGuard} from "./offer-edit/offer-edit.guard";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {OffersData} from "./offersData";

@NgModule({
  declarations: [
    OfferListComponent,
    OfferDetailComponent,
    ConvertToSpacesPipe,
    OfferAddComponent,
    OfferEditComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'offers', component: OfferListComponent },
      { path: 'offers/:id',
        canActivate: [OfferDetailGuard],
        component: OfferDetailComponent,
      },
      { path: 'offers/:id/edit',
        canDeactivate: [OfferEditGuard],
        component: OfferEditComponent},
      { path: 'add-offer', component: OfferAddComponent}
    ]),
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(OffersData)
  ]
})
export class OfferModule { }
