import {Component, OnDestroy, OnInit} from "@angular/core";
import {IOffer} from "./offer";
import {OfferService} from "./offer.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit, OnDestroy{
  pageTitle: string = 'Toys List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log("In setter: ", value);
    this.filteredOffers = this.performFilter(value);
  }

  filteredOffers: IOffer[] = [];
  offers: IOffer[] = [];

  ngOnInit(): void {
    this.sub = this.offerService.getOffers().subscribe({
      next: offers => {
        this.offers = offers;
        this.filteredOffers = this.offers;
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

  constructor(private offerService: OfferService) {}

  private performFilter(filterBy: string): IOffer[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.offers.filter(
      (offer: IOffer) => offer.toy.toyName.toLocaleLowerCase().includes(filterBy));
  }

  onRatingClicked(message: string): void {
    this.pageTitle = "Toys List: " + message;
  }

}
