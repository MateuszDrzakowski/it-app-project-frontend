import {Component, OnDestroy, OnInit} from "@angular/core";
import {IOffer} from "../ioffer";
import {OfferService} from "../offer.service";
import {Subscription} from "rxjs";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidator} from "../../shared/generic.validator";
import {NumberValidators} from "../../shared/number.validator";

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
  displayMessage: { [key: string]: string } = {};
  private readonly validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;


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
    this.validationMessages = {
      ageMinimum: {
        validateRange: 'Minimum age must be in range 0-18'
      },
      imageURL: {},
      city: {
        minlength: 'The city name need to be at lest 2 characters long.',
        maxlength: 'The city name cannot be longer than 25 characters.',
      },
      offerType: {
      },
      price: {
      },
      deliveryOption: {
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.offerSearchFormGroup = this.formBuilder.group({
      cityFlag: false,
      ageMinimumFlag: false,
      offerTypeFlag: false,
      deliveryOptionFlag: false,
      priceFlag: false,
      // toyDetailsFlag: false,
      city: ['', [Validators.minLength(2), Validators.maxLength(25)]],
      ageMinimum: [null, NumberValidators.validateRange(0, 18)],
      offerType: '',
      deliveryOption: null,
      price: null,
      userId: null,
      // toyDetails: this.formBuilder.array([this.buildToyDetails()])
    });

    this.getOffers();
    // this.assignValidationMessages();
    this.offerSearchFormGroup.valueChanges.subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.offerSearchFormGroup);
    });
  }

  public getOffers() {
    this.sub = this.offerService.getOffers().subscribe({
      next: offers => {
        this.offers = offers;
      },
      error: error => this.errorMessage = error
    });
  }

  private getOffersWithQueryParams(city: string | null,     ageMin: number | null,     offerType: string | null,     price: number | null,     deliveryOption: string | null,     userId: number | null) {
    this.sub = this.offerService.getOffersWithQueryParams(city, ageMin, offerType, price, deliveryOption, userId)
      .subscribe({
        next: offers => {
          this.offers = offers;
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
    console.log('search: ' + JSON.stringify(this.offerSearchFormGroup.value));

    this.getOffersWithQueryParams(this.retrieveControlValue('city'),
      this.retrieveControlValue('ageMinimum'),
      this.retrieveControlValue('offerType'),
      this.retrieveControlValue('deliveryOption'),
      this.retrieveControlValue('price'),
      null);
  }

  retrieveControlValue(controlName: string): any {
    let value: any = null;
    if(this.offerSearchFormGroup.get(controlName + 'Flag')?.value) {
      value = this.offerSearchFormGroup.get(controlName)?.value;
      if(typeof value == "string") {
        value = value.trim();
        value = value.length != 0 ? value : null;
      }
    }
    return value;
  }




  mockLog() {
    console.log(this.offerSearchFormGroup);
    console.log('Saved: ' + JSON.stringify(this.offerSearchFormGroup.value));
  }

  flagCheckboxChanged(formControlName: string) {
    if(this.offerSearchFormGroup.get(formControlName + 'Flag')?.value == false) {
      this.offerSearchFormGroup.get(formControlName)?.reset()
    }
  }
}
