import {Component, OnInit, ViewChild} from '@angular/core';
import {IOffer} from "../ioffer";
import {Subscription} from "rxjs";
import {ISwapRequest} from "../../swapRequests/iswapRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferService} from "../offer.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AuthenticationService} from "../../shared/authentication.service";

@Component({
  selector: 'app-create-exchange-offer',
  templateUrl: './create-exchange-offer.component.html',
  styleUrls: ['./create-exchange-offer.component.css']
})
export class CreateExchangeOfferComponent implements OnInit {

  pageTitle: string = "Offer Detail";
  targetOffer: IOffer | undefined;
  targetOfferId: number | null = null;
  requesterOffers: IOffer[] | undefined;
  reqSub!: Subscription;
  tarSub!: Subscription;
  swapSub!: Subscription
  routeSub!: Subscription;
  swapRequest: ISwapRequest | undefined;
  errorMessage: string = '';
  userId: number | null = null;
  listImageWidth: number = 120;
  imageWidth: number = 300;
  imageMargin: number = 2;
  imageURLS = ["assets/images/xbox-controller.png", "assets/images/xbox-controller.png", "assets/images/xbox-controller.png"]
  selectedToyId: number | null = null;
  selectedToyName: string | null = null;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['imageURL', 'toyName', 'toyType', 'ageMinimum', 'offerType', 'price'];
  // @ts-ignore
  dataSource: MatTableDataSource<IOffer>;

  tiles: any[] = [
    {cols: 3, rows: 1},
    {cols: 1, rows: 2},
  ];

  constructor(private route: ActivatedRoute,
              private offerService: OfferService,
              private router: Router,
              public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(
      params => {
        this.targetOfferId = Number(params.get('offerId'));
        if (this.targetOfferId != null) {
          this.tarSub = this.getTargetOffer(this.targetOfferId)
        }
      }
    )

    const loggedUserId = this.authenticationService.loggedUserId;
    if (loggedUserId != null) {
      this.getRequesterOffers(null, null, null, null, null, loggedUserId)
    } else {
      const loggedUserId = 1;
      this.getRequesterOffers(null, null, null, null, null, loggedUserId)
    }

  }

  private getRequesterOffers(city: string | null, ageMin: number | null, offerType: string | null, price: number | null, deliveryOption: string | null, userId: number | null) {
    this.reqSub = this.offerService.getOffersWithQueryParams(city, ageMin, offerType, price, deliveryOption, userId)
      .subscribe({
        next: offers => {
          this.requesterOffers = offers
          this.dataSource = new MatTableDataSource<IOffer>(offers);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          if (offers != null && offers.length != 0) {
            this.pageTitle = this.pageTitle + offers[0].userId;
          }
        },
        error: error => this.errorMessage = error
      });
  }

  private getTargetOffer(id: number) {
    return this.offerService.getOffer(id).subscribe({
      next: offerData => {
        this.targetOffer = offerData;
      },
      error: error => this.errorMessage = error
    });
  }

  onBack(): void {
    this.router.navigate(['/offers'])
  }

  create() {
    if (this.authenticationService.loggedUserId && this.targetOfferId && this.targetOffer?.id && this.targetOfferId && this.selectedToyName) {
      const swapReq: ISwapRequest = {
        "id": null,
        "requesterUserId": this.authenticationService.loggedUserId,
        "targetUserId": this.targetOfferId,
        "inExchangeOfferId": this.selectedToyId,
        "targetOfferId": this.targetOffer.id,
        "acceptedByTargetUser": null,
        "targetToyName": this.targetOffer.toy.toyName,
        "inExchangeToyName": this.selectedToyName
      }

      this.offerService.saveSwapRequest(swapReq)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        })
    } else {
      this.errorMessage = 'Please correct the validation errors'
    }
  }

  private onSaveComplete() {
    this.router.navigate(['/offers']);
  }

  ngOnDestroy(): void {
    this.tarSub.unsubscribe();
    this.reqSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  onSelection(e: any, v: any) {
    console.log("Selection list");
    for (let a of v) {
      console.log(a.value);
      console.log(a.value["toy"]);
      console.log(a.value["id"]);
      this.selectedToyId = a.value["id"]
      this.selectedToyName = a.value["toy"]["toyName"];
    }
  }

}
