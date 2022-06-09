import {Component, OnDestroy, OnInit} from "@angular/core";
import {IOffer} from "../ioffer";
import {OfferService} from "../offer.service";
import {Subscription} from "rxjs";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Toys List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;

  // @ts-ignore
  offerSearchFormGroup: FormGroup;
  // @ts-ignore
  cityValidationMessage: string;
  // @ts-ignore
  toyTypeValidationMessage: string;
  // @ts-ignore
  priceValidationMessage: string;


  private _listFilter: string = '';

  get toyDetails(): FormArray {
    return <FormArray> this.offerSearchFormGroup.get('toyDetails');
  }

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

  constructor(private offerService: OfferService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.offerSearchFormGroup = this.formBuilder.group({
      cityFlag: false,
      ageMinFlag: false,
      offerTypeFlag: false,
      toyDetailsFlag: false,
      city: '',
      ageMin: null,
      offerType: '',
      deliveryOption: null,
      userId: null,
      toyDetails: this.formBuilder.array([this.buildToyDetails()])
    });

    this.sub = this.offerService.getOffers().subscribe({
      next: offers => {
        this.offers = offers;
        this.filteredOffers = this.offers;
      },
      error: error => this.errorMessage = error
    });
  }

  buildToyDetails(): FormGroup {
    return this.formBuilder.group({
      price: null,
      toyType: ''
    })
  }

  addToyDetails(): void {
    this.toyDetails.push(this.buildToyDetails());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  private performFilter(filterBy: string): IOffer[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.offers.filter(
      (offer: IOffer) => offer.toy.toyName.toLocaleLowerCase().includes(filterBy));
  }

  onRatingClicked(message: string): void {
    this.pageTitle = "Toys List: " + message;
  }

  search() {
    console.log(this.offerSearchFormGroup);
    console.log('Saved: ' + JSON.stringify(this.offerSearchFormGroup.value));
  }

  mockLog() {
    console.log(this.offerSearchFormGroup);
    console.log('Saved: ' + JSON.stringify(this.offerSearchFormGroup.value));
  }

}
