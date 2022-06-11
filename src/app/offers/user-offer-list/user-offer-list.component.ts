import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {OfferService} from "../offer.service";
import {IOffer} from "../ioffer";
import {ActivatedRoute, Router} from "@angular/router";

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'Deleted successfully',
}, {
  type: 'danger',
  message: 'Deletion was not successful',
}
];

@Component({
  selector: 'app-user-offer-list',
  templateUrl: './user-offer-list.component.html',
  styleUrls: ['./user-offer-list.component.css']
})
export class UserOfferListComponent implements OnInit {

  pageTitle: string = 'Your Offers List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;
  offers: IOffer[] = [];
  // @ts-ignore
  alerts: Alert[] = [];
  userId: number;

  constructor(private offerService: OfferService, private route: ActivatedRoute, private router: Router) {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));

  }

  ngOnInit(): void {
    console.log("this userId: ", this.userId)
    this.sub = this.offerService.getOffersWithQueryParams(null, null, null, null, null, this.userId)
      .subscribe({
        next: offers => {
          this.offers = offers;
        },
        error: error => this.errorMessage = error
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = "Toys List: " + message;
  }

  deleteOffer(offerId: number | null) {
    if (offerId != null && confirm('Are you sure, you want delete the offer?')) {
      this.offerService.deleteOffer(offerId)
        .subscribe({
          next: () => this.deletedSuccessfully(),
          error: err => this.deletionNotSuccessful(err)
        });
    }
  }

  close(alert: Alert) {
    this.alerts.pop();
  }

  private deletedSuccessfully() {
    this.alerts.push(ALERTS[0]);
  }

  private deletionNotSuccessful(err: string) {
    this.errorMessage = err;
    this.alerts.push(ALERTS[1]);
  }

}
