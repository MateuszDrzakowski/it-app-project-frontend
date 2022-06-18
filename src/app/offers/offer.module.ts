import {NgModule} from '@angular/core';
import {OfferListComponent} from "./offer-list/offer-list.component";
import {OfferDetailComponent} from "./offer-detail/offer-detail.component";
import {ConvertToSpacesPipe} from "../shared/custom_pipes/convert-to-spaces.pipe";
import {RouterModule} from "@angular/router";
import {OfferDetailGuard} from "./offer-detail/offer-detail.guard";
import {SharedModule} from '../shared/shared.module';
import {OfferAddComponent} from './offer-add/offer-add.component';
import {ReactiveFormsModule} from "@angular/forms";
import {OfferEditComponent} from './offer-edit/offer-edit.component';
import {OfferEditGuard} from "./offer-edit/offer-edit.guard";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {MockedBackendData} from "../mockedBackendData";
import {UserOfferListComponent} from './user-offer-list/user-offer-list.component';
import {ProfilesModule} from "../profiles/profiles.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MaterialModule} from "../material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ExchangeOfferComponent } from './exchange-offer/exchange-offer.component';
import { CreateExchangeOfferComponent } from './create-exchange-offer/create-exchange-offer.component';


@NgModule({
  declarations: [
    OfferListComponent,
    OfferDetailComponent,
    ConvertToSpacesPipe,
    OfferAddComponent,
    OfferEditComponent,
    UserOfferListComponent,
    ExchangeOfferComponent,
    CreateExchangeOfferComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path: 'offers', component: OfferListComponent},
      {path: 'offers/user-offers/:userId', component: UserOfferListComponent},
      {
        path: 'offers/:id',
        canActivate: [OfferDetailGuard],
        component: OfferDetailComponent,
      },
      {
        path: 'offers/:id/edit',
        canDeactivate: [OfferEditGuard],
        component: OfferEditComponent
      },
      {path: 'add-offer', component: OfferAddComponent},
      {path: 'exchange-offer/:id', component: ExchangeOfferComponent},
      {path: 'create-exchange-offer/:offerId', component: CreateExchangeOfferComponent}
    ]),
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(MockedBackendData),
    ProfilesModule,
    MatButtonToggleModule,
    MaterialModule,
    BrowserAnimationsModule
  ]
})
export class OfferModule { }
