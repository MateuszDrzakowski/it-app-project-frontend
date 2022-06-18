import { Component, OnInit } from '@angular/core';
import {IOffer} from "../ioffer";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferService} from "../offer.service";
import {ISwapRequest} from "../../swapRequests/iswapRequest";
import {AuthenticationService} from "../../shared/authentication.service";

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
  swapSub!: Subscription
  routeSub!: Subscription;
  swapRequest: ISwapRequest | undefined;
  errorMessage: string = '';
  userId: number | null = null;
  imageWidth: number = 300;
  imageMargin: number = 2;
  imageURLS = ["assets/images/xbox-controller.png", "assets/images/xbox-controller.png", "assets/images/xbox-controller.png"]

  constructor(private route: ActivatedRoute,
              private offerService: OfferService,
              private router: Router,
              public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.routeSub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if(id != null ){
          this.swapSub = this.getSwapRequest(Number(id))
        }
      }
    )
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
    if(this.swapRequest && confirm('Are you sure, you want to accept the offer?')) {
      this.swapRequest.acceptedByTargetUser = true;
      this.offerService.updateSwapRequest(this.swapRequest)
        .subscribe({
          next: () => this.onRequestCompleted(),
          error: err => this.errorMessage = err
        });
    }
  }

  Decline() {
    if(this.swapRequest && confirm('Are you sure, you want decline the offer?')) {
      this.swapRequest.acceptedByTargetUser = false;
      this.offerService.updateSwapRequest(this.swapRequest)
        .subscribe({
          next: () => this.onRequestCompleted(),
          error: err => this.errorMessage = err
        });
    }
  }

  Delete() {
    if(this.swapRequest && confirm('Are you sure, you want decline the offer?')) {
      this.offerService.deleteSwapRequest(this.swapRequest.id)
        .subscribe({
          next: () => this.onRequestCompleted(),
          error: err => this.errorMessage = err
        });
    }
  }

  private onRequestCompleted() {
    this.router.navigate(['/offers']);
  }

}
