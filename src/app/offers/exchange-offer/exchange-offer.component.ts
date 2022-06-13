import { Component, OnInit } from '@angular/core';
import {IOffer} from "../ioffer";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferService} from "../offer.service";
import {ISwapRequest} from "../../swapRequests/iswapRequest";

@Component({
  selector: 'app-exchange-offer',
  templateUrl: './exchange-offer.component.html',
  styleUrls: ['./exchange-offer.component.css']
})
export class ExchangeOfferComponent implements OnInit {

  pageTitle: string = "Offer Detail";
  targetOffer: IOffer | undefined;
  requestorOffer: IOffer | undefined;
  reqSub!: Subscription;
  tarSub!: Subscription;
  swapSub!: Subscription;
  swapRequest: ISwapRequest | undefined;
  errorMessage: string = '';
  userId: number | null = null;
  imageWidth: number = 300;
  imageMargin: number = 2;
  imageURLS = ["assets/images/xbox-controller.png", "assets/images/xbox-controller.png", "assets/images/xbox-controller.png"]

  constructor(private route: ActivatedRoute,
              private offerService: OfferService,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.swapSub = this.getSwapRequest(id)
  }

  private getSwapRequest(id: number) {
    return this.offerService.getSwapRequest(id).subscribe({
      next: swapRequest => {
        this.swapRequest = swapRequest;
        if(swapRequest.inExchangeOfferId != null && swapRequest.targetOfferId != null) {
          this.reqSub = this.getRequestorOffer(swapRequest.inExchangeOfferId);
          this.tarSub = this.getTargetOffer(swapRequest.targetOfferId);
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

  private getRequestorOffer(id: number) {
    return this.offerService.getOffer(id).subscribe({
      next: offerData => {
        this.requestorOffer = offerData;
      },
      error: error => this.errorMessage = error
    });
  }

  onBack(): void {
    this.router.navigate(['/offers'])
  }

  Accept() {

  }

  Decline() {
    if(this.swapRequest && confirm('Are you sure, you want decline the offer?')) {
      this.offerService.deleteSwapRequest(this.swapRequest.id)
        .subscribe({
          next: () => this.onDeclineComplete(),
          error: err => this.errorMessage = err
        });
    }
  }

  private onDeclineComplete() {
    this.router.navigate(['/offers']);
  }
}
