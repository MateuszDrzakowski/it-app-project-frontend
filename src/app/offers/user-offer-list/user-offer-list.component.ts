import {Component, OnInit, ViewChild} from '@angular/core';
import {of, Subscription} from "rxjs";
import {OfferService} from "../offer.service";
import {IOffer} from "../ioffer";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {AuthenticationService} from "../../shared/authentication.service";

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

  pageTitle: string = 'Offers of user id: ';
  imageWidth: number = 100;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;
  offers: IOffer[] = [];
  // @ts-ignore
  alerts: Alert[] = [];
  userId: number;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['imageURL', 'toyName', 'toyType', 'ageMinimum', 'offerType', 'city', 'price', 'actions'];
  // @ts-ignore
  dataSource: MatTableDataSource<IOffer>;

  constructor(private offerService: OfferService, private route: ActivatedRoute, private router: Router,
              public authenticationService: AuthenticationService) {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
  }

  ngOnInit(): void {
    console.log("this userId: ", this.userId)
    this.getOffers(null, null, null, null, null, this.userId);
  }

  private getOffers(city: string | null,     ageMin: number | null,     offerType: string | null,     price: number | null,     deliveryOption: string | null,     userId: number | null) {
    this.sub = this.offerService.getOffersWithQueryParams(city, ageMin, offerType, price, deliveryOption, userId)
      .subscribe({
        next: offers => {
          this.offers = offers
          this.dataSource = new MatTableDataSource<IOffer>(offers);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          if(offers != null && offers.length != 0) {
            this.pageTitle = this.pageTitle + offers[0].userId;
          }
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
    this.getOffers(null, null, null, null, null, this.userId);
  }

  private deletionNotSuccessful(err: string) {
    this.errorMessage = err;
    this.alerts.push(ALERTS[1]);
  }

}
